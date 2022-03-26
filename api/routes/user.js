const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Factory = require('../factory/factory');

const usersController = Factory.createUsersController(); 

// api/users
router.get('/', usersController.getAll);

// api/users/:id
router.get('/:id', usersController.getById);

// api/users/:id/vehicleConfig
router.post('/:id/vehicleConfig', auth, usersController.setVehicleConfig);

// api/users
router.put('/', auth, usersController.updateUser);

// api/users/:id
router.delete('/:id', auth, usersController.deleteUser)

module.exports = router;