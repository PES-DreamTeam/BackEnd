const { userService, chargePointService, authService, socialMediaService, reportService, achievementService } = require('../services');
const { UsersController, ChargePointsController, AuthController, ReportController, AchievementController } = require('../controllers');
const ToolController = require('../tools/toolController');
const { Users, VehicleInstances, BikeStations, DefaultStations, Reports, ReportStations, Achievements} = require('../models');
const axios = require('axios')
const NodeCache = require('node-cache');
const randomstring = require('randomstring');

const Factory = () => {
    const createUsersController = () => {
        const userService = createUserService();
        const chargePointService = createChargePointService();
        return UsersController({userService, chargePointService}); 
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

    const createReportController = (dependencies) => {
        const reportService = createReportService();
        return ReportController({reportService});
    }

    const createAchievementController = () => {
        const achievementService = createAchievementService();
        return AchievementController({achievementService});
    }

    const createReportService = (dependencies) => {
        return reportService({Reports}); 
    }

    const createSocialMediaService = (dependencies) => {
        if(!dependencies)
            return socialMediaService({axios}); 
        else{
            let { axios } = dependencies;
            return socialMediaService({axios}); 
        }
    }

    const createAchievementService = (dependencies) => {
        if(!dependencies)
            return achievementService({Achievements});
        else{
            let { Achievements } = dependencies;
            return achievementService({Achievements});
        }
    }

    const createChargePointService = (dependencies) => {
        if(!dependencies)
            return chargePointService({NodeCache, axios, BikeStations, DefaultStations, userService, ReportStations});
        else{
            let { NodeCache, axios, BikeStations, DefaultStations, userService, ReportStations } = dependencies;
            return chargePointService({NodeCache, axios, BikeStations, DefaultStations, userService, ReportStations});
        }
    }

    const createUserService = (dependencies) => {
        if(!dependencies) 
            return userService({Users, VehicleInstances, DefaultStations, Achievements});
        else
        {
            const { Users, VehicleInstances, DefaultStations, Achievements} = dependencies;
            return userService({Users, VehicleInstances, DefaultStations, Achievements});
        }
    }

    return {
        createUsersController,
        createUserService,
        createChargePointService,
        createChargePointsController,
        createAuthController,
        createToolController,
        createSocialMediaService,
        createReportController,
        createAchievementService,
        createAchievementController
    }
}

module.exports = Factory;