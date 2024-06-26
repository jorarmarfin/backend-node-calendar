const { validationResult } = require('express-validator');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const userCreate = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User(req.body);

    try {
        let searchUser = await User.findOne({email});
        if (searchUser) {
            return res.status(400).json({
                ok: false,
                message: 'User already exists'
            });
        }
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            message: 'User created',
            data: {
                ui: user._id,
                name,
                email,
                password
            }
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error creating user',
        });
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {

        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'User not found'
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid password'
            });
        }
        const token = await generateJWT(user._id, user.name);
        res.status(200).json({
            ok: true,
            message: 'User logged in',
            data: {
                ui: user._id,
                name: user.name,
                token
            }
        });


    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error signing in',
        });
    }
}
const refreshToken = async (req, res) => {
    const {uid, name} = req;
    const token = await generateJWT(uid, name);
    res.json({
        ok: true,
        message: 'Refresh Token',
        data: {
            token
        }
    });
}

module.exports = {
    userCreate,
    signIn,
    refreshToken
}