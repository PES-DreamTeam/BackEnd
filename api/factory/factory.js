const { userService, chargePointService, authService, socialMediaService, reportService, achievementService, chatService, msgService } = require('../services');
const { UsersController, ChargePointsController, AuthController, ReportController, AchievementController, ServiceController, ChatController, MsgController } = require('../controllers');
const ToolController = require('../tools/toolController');
const { Users, VehicleInstances, BikeStations, DefaultStations, Reports, ReportStations, Achievements, Highlights, Chat, Message} = require('../models');
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

    const createMsgController = () => {
        const msgService = createMsgService();
        return MsgController({msgService});
    }

    const createChatController = () => {
        const chatService = createChatService();
        return ChatController({chatService});
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

    const createMsgService = (dependencies) => {
        if(!dependencies)
            return msgService({Message});
        else{
            let { Message } = dependencies;
            return msgService({Message});
        }
    }

    const createChatService = (dependencies) => {
        if(!dependencies)
            return chatService({Chat});
        else{
            let { Chat } = dependencies;
            return chatService({Chat});
        }
    }

    const createChargePointService = (dependencies) => {
        if(!dependencies)
            return chargePointService({NodeCache, axios, BikeStations, DefaultStations, userService, ReportStations, Highlights});
        else{
            let { NodeCache, axios, BikeStations, DefaultStations, userService, ReportStations, Highlights } = dependencies;
            return chargePointService({NodeCache, axios, BikeStations, DefaultStations, userService, ReportStations, Highlights});
        }
    }

    const createUserService = (dependencies) => {
        if(!dependencies) 
            return userService({Users, VehicleInstances, DefaultStations, Achievements, Chat, Message});
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
        createMsgController,
        createChatController,
    }
}

module.exports = Factory;