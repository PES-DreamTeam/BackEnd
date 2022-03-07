const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { authValidation } = require('../validations');
const validate = require('../middlewares/validate');

// api/auth/register
router.post('/register', validate(authValidation.register), authController.register);

// api/auth/login
router.post('/login', validate(authValidation.login), authController.login);

module.exports = router;