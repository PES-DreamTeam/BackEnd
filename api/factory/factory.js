const { userService, chargePointService, authService } = require('../services');
const { UsersController, ChargePointsController, AuthController } = require('../controllers');
const { Users, VehicleInstances, BikeStation } = require('../models');
const axios = require('axios')
const NodeCache = require('node-cache');

const Factory = () => {
    const createUsersController = () => {
        const userService = createUserService();
        return UsersController({userService}); 
    }

    const createUserService = (dependencies) => {
        if(!dependencies) 
            return userService({Users, VehicleInstances});
        else
        {
            const { Users, VehicleInstances } = dependencies;
            return userService({Users, VehicleInstances});
        }
    }

    const createChargePointService = (dependencies) => {
        if(!dependencies)
            return chargePointService({NodeCache, axios, BikeStation});
        else{
            const { NodeCache, axios, BikeStation } = dependencies;
            return chargePointService({NodeCache, axios, BikeStation});
        }
    }
    const createChargePointsController = () => {
        const chargePointService = createChargePointService();
        return ChargePointsController({chargePointService});
    }

    const createAuthController = () => {
        const userService = createUserService();
        return AuthController({userService, authService});
    }

    return {
        createUsersController,
        createUserService,
        createChargePointService,
        createChargePointsController,
        createAuthController,
    }
}

module.exports = Factory;