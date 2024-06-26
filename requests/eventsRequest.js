const {response} = require('express');
const {validationResult, check} = require("express-validator");
const {isDate} = require("../helpers/isDate");

const checkTitle = check('title','The name is required').not().isEmpty();
const checkNotes = check('notes','The notes is required').not().isEmpty();
const checkStart = check('start','The start date is required').custom(isDate);
const checkEnd = check('end','The end date is required').custom(isDate);


const validateFieldsEvent = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        ok: false,
        message: 'Validation error',
        errors: errors.array()
    });

    next();
}

module.exports = {
    validateFieldsEvent,
    checkTitle,
    checkNotes,
    checkStart,
    checkEnd
}