/**
 * api/auth
 */
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {userCreate,signIn,refreshToken} = require('../controllers/auth');

router.post('/', signIn);

router.post('/user',[
    check('name','The name is required').not().isEmpty(),
    check('email','The email is required').isEmail(),
    check('password','The password is required').isLength({min:6})
],userCreate);

router.get('/refresh-token',refreshToken);

module.exports = router;