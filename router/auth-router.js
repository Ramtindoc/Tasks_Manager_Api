const express = require('express');
const router = express.Router();
const { limiter, register, login} = require('../controller/user-controller');
const { refreshToken } = require("../controller/auth-controller");

router.post('/register',register);
router.post('/login', login ,limiter);
router.post('/refresh-token',refreshToken)

module.exports = router;