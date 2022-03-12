const express = require('express');
const router = express.Router();
const { vehicleConfigController } = require('../controllers');
// const { authValidation } = require('../validations');
// const validate = require('../middlewares/validate');

// api/vehicleConfig/store
router.get('/store', vehicleConfigController.vehicleTest);

// api/auth/login
// router.post('/login', validate(authValidation.login), authController.login);

module.exports = router;