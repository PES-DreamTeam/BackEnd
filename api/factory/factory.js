const { userService } = require('../services');
const { UsersController } = require('../controllers');
const { Users, VehicleInstances } = require('../models');

const createUsersController = () => {
    const userService = createUserService();
    return UsersController({userService}); 
}

const createUserService = () => {
    return userService({Users, VehicleInstances});
}

module.exports = {
    createUsersController,
};