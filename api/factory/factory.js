const { userService, chargePointService, authService, socialMediaService } = require('../services');
const { UsersController, ChargePointsController, AuthController } = require('../controllers');
const ToolController = require('../tools/toolController');
const { Users, VehicleInstances, BikeStations } = require('../models');
const axios = require('axios')
const NodeCache = require('node-cache');
const randomstring = require('randomstring');

const Factory = () => {
    const createUsersController = () => {
        const userService = createUserService();
        return UsersController({userService}); 
    }

    const createChargePointsController = () => {
        const chargePointService = createChargePointService();
        return ChargePointsController({chargePointService});
    }

    const createAuthController = () => {
        const userService = createUserService();
        const socialMediaService = createSocialMediaService();
        return AuthController({userService, authService, socialMediaService, randomstring});
    }

    const createToolController = (dependencies) => {
        if(!dependencies)
            return ToolController({BikeStations, axios});
        else {
            let { BikeStations, axios } = dependencies;
            return ToolController({BikeStations, axios});
        }
    }

    const createSocialMediaService = (dependencies) => {
        if(!dependencies)
            return socialMediaService({axios}); 
        else{
            let { axios } = dependencies;
            return socialMediaService({axios}); 
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

    const createUserService = (dependencies) => {
        if(!dependencies) 
            return userService({Users, VehicleInstances});
        else
        {
            const { Users, VehicleInstances } = dependencies;
            return userService({Users, VehicleInstances});
        }
    }

    return {
        createUsersController,
        createUserService,
        createChargePointService,
        createChargePointsController,
        createAuthController,
        createToolController,
        createSocialMediaService
    }
}

module.exports = Factory;