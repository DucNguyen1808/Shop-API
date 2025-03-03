const express = require('express');
const UserController = require('../app/controllers/UserController');
const {verifyAccessToken} = require('../services/jwtService');
const router = express.Router();

 test
router.get("/user", UserController.index);


router.get('/', verifyAccessToken, UserController.index);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/refresh-token', UserController.refreshToken);

module.exports = router;
