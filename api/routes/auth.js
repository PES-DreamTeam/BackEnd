const express = require('express');
const router = express.Router();
const { authValidation } = require('../validations');
const validate = require('../middlewares/validate');
const Factory = require('../factory/factory');

const factory = Factory();
const authController = factory.createAuthController();

// api/auth/register
router.post('/register', validate(authValidation.register), authController.register);

// api/auth/login
router.post('/login', validate(authValidation.login), authController.login);

// api/auth/social-login
router.post('/social-login', authController.socialMediaLogin);

module.exports = router;