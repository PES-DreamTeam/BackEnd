const { userService, chargePointService, authService } = require('../services');
const { UsersController, ChargePointsController, AuthController } = require('../controllers');
const { Users, VehicleInstances, BikeStations } = require('../models');
const axios = require('axios')
const NodeCache = require('node-cache');

const Factory = () => {
    const createUsersController = () => {
        const userService = createUserService();
        const chargePointService = createChargePointService();
        return UsersController({userService, chargePointService}); 
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
            return chargePointService({NodeCache, axios, BikeStations});
        else{
            let { NodeCache, axios, BikeStations } = dependencies;
            return chargePointService({NodeCache, axios, BikeStations});
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