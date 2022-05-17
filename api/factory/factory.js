const { userService, chargePointService, authService, socialMediaService, reportService, achievementService, sampleVehicleService } = require('../services');
const { UsersController, ChargePointsController, AuthController, ReportController, AchievementController, ServiceController, sampleVehiclesController } = require('../controllers');
const ToolController = require('../tools/toolController');
const { Users, VehicleInstances, BikeStations, DefaultStations, Reports, ReportStations, Achievements, Highlights} = require('../models');
const axios = require('axios')
const NodeCache = require('node-cache');
const randomstring = require('randomstring');

const Factory = () => {
    const createUsersController = () => {
        const userService = createUserService();
        const chargePointService = createChargePointService();
        return UsersController({userService, chargePointService}); 
    }
    
    const createSampleVehicleController = (dependencies) => {
        return sampleVehiclesController({sampleVehicleService});

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
            return ToolController({BikeStations, axios, chargePointService, userService, Highlights, Achievements});
        }
        else {
            let { BikeStations, axios, chargePointService, userService, Highlights } = dependencies;
            return ToolController({BikeStations, axios, chargePointService, userService, Highlights});
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

    const createServiceController = (dependencies) => {
        if(!dependencies) {
            const chargePointService = createChargePointService();
            return ServiceController({chargePointService});        
        }
        else {
            let { chargePointService } = dependencies;
            return ToolController({chargePointService});
        }
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
            return chargePointService({NodeCache, axios, BikeStations, DefaultStations, ReportStations, Highlights});
        else{
            let { NodeCache, axios, BikeStations, DefaultStations, ReportStations, Highlights } = dependencies;
            return chargePointService({NodeCache, axios, BikeStations, DefaultStations, ReportStations, Highlights});
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
        createAchievementController,
        createServiceController,
        createSampleVehicleController
    }
}

module.exports = Factory;