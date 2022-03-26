const { userService, chargePointService } = require('../services');
const { UsersController, ChargePointsController } = require('../controllers');
const { Users, VehicleInstances } = require('../models');
const axios = require('axios')
const NodeCache = require('node-cache');

const Factory = (dependencies) => {
    const createUsersController = () => {
        const userService = createUserService();
        return UsersController({userService}); 
    }

    const createUserService = () => {
        if(!dependencies) 
            return userService({Users, VehicleInstances});
        else
        {
            const { Users, VehicleInstances } = dependencies;
            return userService({Users, VehicleInstances});
        }
    }

    const createChargePointService = () => {
        if(!dependencies)
            return chargePointService({NodeCache, axios});
        else{
            const { NodeCache, axios } = dependencies;
            return chargePointService({NodeCache, axios});
        }
    }
    const createChargePointsController = () => {
        const chargePointService = createChargePointService();
        return ChargePointsController({chargePointService});
    }

    return {
        createUsersController,
        createUserService,
        createChargePointService,
        createChargePointsController
    }
}

module.exports = Factory;