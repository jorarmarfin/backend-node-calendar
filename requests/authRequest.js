const {response} = require('express');
const {validationResult, check} = require("express-validator");

const checkName = check('name','The name is required').not().isEmpty();
const checkEmail = check('email','The email is required').isEmail();
const checkPassword = check('password','The password is required').isLength({min:6});


const validateFields = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        ok: false,
        message: 'Validation error',
        errors: errors.array()
    });

    next();
}

module.exports = {
    validateFields,
    checkName,
    checkEmail,
    checkPassword
}