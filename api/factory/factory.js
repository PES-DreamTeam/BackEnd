const { userService, chargePointService, authService, socialMediaService } = require('../services');
const { UsersController, ChargePointsController, AuthController } = require('../controllers');
const ToolController = require('../tools/toolController');
const { Users, VehicleInstances, BikeStations, DefaultStations } = require('../models');
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
        const userService = createUserService();
        return ChargePointsController({chargePointService, userService});
    }

    const createAuthController = () => {
        const userService = createUserService();
        const socialMediaService = createSocialMediaService();
        return AuthController({userService, authService, socialMediaService, randomstring});
    }

    const createToolController = (dependencies) => {
        if(!dependencies) {
            const chargePointService = createChargePointService();
            return ToolController({BikeStations, axios, chargePointService, userService});
        }
        else {
            let { BikeStations, axios, chargePointService } = dependencies;
            return ToolController({BikeStations, axios, chargePointService});
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
            return chargePointService({NodeCache, axios, BikeStations, DefaultStations, userService});
        else{
            let { NodeCache, axios, BikeStations, DefaultStations, userService } = dependencies;
            return chargePointService({NodeCache, axios, BikeStations, DefaultStations, userService});
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