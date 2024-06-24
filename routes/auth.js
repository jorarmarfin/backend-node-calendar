/**
 * api/auth
 */
const express = require('express');
const router = express.Router();
const {userCreate,signIn,refreshToken} = require('../controllers/auth');

router.post('/', signIn);

router.post('/user',userCreate);

router.get('/refresh-token',refreshToken);

module.exports = router;