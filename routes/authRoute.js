const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {userCreate,signIn,refreshToken} = require('../controllers/authController');
const {checkEmail,checkName,checkPassword, validateFieldsAuth} = require("../requests/authRequest");
const {validateJWT} = require("../middlewares/validateJWT");
// api/auth
router.post('/', signIn);

router.post('/user',[
    checkName,
    checkEmail,
    checkPassword,
    validateFieldsAuth
],userCreate);

router.get('/refresh-token',[
    validateJWT
],refreshToken);

module.exports = router;