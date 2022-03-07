const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');

// api/auth/register
router.post('/register', authController.register);

// api/auth/login
router.post('/login', authController.login);

module.exports = router;