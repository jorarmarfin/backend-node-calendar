const { validationResult } = require('express-validator');
const userCreate = (req, res) => {
    const { name, email, password } = req.body;

    // Manejo de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        ok: false,
        message: 'Validation error',
        errors: errors.array()
    });


    res.status(200).json({
        ok: true,
        message: 'User created',
        data: {
            name,
            email,
            password
        }
    });
}

const signIn = (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({
        message: 'Sign In'
    });
}
const refreshToken = (req, res) => {
    res.json({
        message: 'Refresh Token'
    });
}

module.exports = {
    userCreate,
    signIn,
    refreshToken
}