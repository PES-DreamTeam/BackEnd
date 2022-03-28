const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Factory = require('../factory/factory');

const factory = Factory();
const usersController = factory.createUsersController();
const userService = factory.createUserService();
const my_auth = auth(userService);

// api/users
router.get('/', usersController.getAll);

// api/users/:id
router.get('/:id', usersController.getById);

// api/users/:id/vehicleConfig
router.post('/:id/vehicleConfig', my_auth, usersController.setVehicleConfig);

// api/users
router.put('/', my_auth, usersController.updateUser);

// api/users/:id
router.delete('/:id', my_auth, usersController.deleteUser)

module.exports = router;