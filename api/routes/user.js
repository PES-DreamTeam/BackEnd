const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');
const auth = require('../middlewares/auth');

// api/users
router.get('/', usersController.getAll);

// api/users/:id
router.get('/:id', usersController.getById);

// api/users/:id/vehicleConfig
router.post('/:id/vehicleConfig', usersController.setVehicleConfig);

// api/users
router.put('/', auth, usersController.updateUser);

// api/users/:id
router.delete('/:id', auth, usersController.deleteUser)

module.exports = router;