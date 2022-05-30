const User = require("../models/User");

const userService = (dependencies) => {
    const { Users, VehicleInstances, DefaultStations, Achievements } = dependencies;

    /* istanbul ignore next */ 
    const getByEmail = (email) => {
        return Users.findOne({ email });
    }

    /* istanbul ignore next */ 
    const getById = (_id) => {
        return Users.findById(_id);
    }

    /* istanbul ignore next */ 
    const create = async (user) => {
        const achievements = await Achievements.find().exec();
        user.achievements = achievements;
        return Users.create(user);
    }

    /* istanbul ignore next */ 
    const getAll = () => {
        return Users.find();
    }

    /* istanbul ignore next */ 
    const deleteUser = (_id) => {
        VehicleInstances.deleteMany({ user_id: _id });
        return Users.findByIdAndDelete(_id);
    }

    const banUser = async (id) => {
        var user = await Users.findOne({ _id: id });
        return User.findOneAndUpdate({ _id: id }, { banned: !user.banned });
    }


    const setFavourites = async (stationId, user) =>{
        const station = await DefaultStations.findOne({station_id: stationId});
        if(!station){return station;}
        if(user.favourites.includes(stationId)){
            const index = user.favourites.indexOf(stationId);
            user.favourites.splice(index, 1);
        }
        else{
            user.favourites.push(stationId);
        }
        await updateUser(user._id, user);
        return station;
    }

    const setAchievement = async (body, user) =>{
        const id = body.achievement_id;
        const tier = body.achievement_tier;
        const progress = body.progress;
        const achievement = await Achievements.findOne({achievement_id: id.toString(), achievement_tier: tier.toString()});
        if(!achievement){return achievement;}
        user.achievements = user.achievements.map(ach => {
            if(ach.achievement_id == id && ach.achievement_tier == tier){
                ach.progress = progress;
            }
            return ach;
        })
        await updateUser(user._id, user);
        return achievement;
    }

    const getAchievements = async (id) =>{
        const user = await User.findById(id);
        const allAchievements = await Achievements.find();
        const achievements = allAchievements.map(ach => {
            const userAchievement = user.achievements.find(uach => uach.achievement_id == ach.achievement_id && uach.achievement_tier == ach.achievement_tier);
            return {
                achievement_id: ach.achievement_id,
                achievement_tier: ach.achievement_tier,
                description: ach.description,
                objective: ach.objective,
                progress: userAchievement ? userAchievement.progress : 0,
                image: ach.image,
            }
        })
        return achievements;
    }

    const getLikes = async (id) =>{
        const user = await User.findById(id);
        return user.likes;
    }

    const feedUserToWeb = async (user) => {
        const userVehicleConfig = await VehicleInstances.find({user_id : user._id})
        return {
            _id: user._id,
            nickname: user.name,
            email: user.email,
            vehicleConfig: userVehicleConfig,
            profilePicture: user.profilePicture,
            isNew: user.isNew,
            likes: user.likes,
            reports: user.reports,
            favourites: user.favourites,
            achievements: user.achievements,
            currentVehicle: user.currentVehicle,
            isAdmin: user.isAdmin,
            banned: user.banned,
        }
    }

    /* istanbul ignore next */ 
    const getVehicleConfig = (numberPlate) => {
        return VehicleInstances.findOne({numberPlate});
    }

    /* istanbul ignore next */ 
    const setVehicleConfig = (vehicleConfig) =>{
        return VehicleInstances.create(vehicleConfig)
    }

    const deleteVehicleConfig = (numberPlate) =>{
        return VehicleInstances.findOneAndDelete({numberPlate});
    }

    /* istanbul ignore next */ 
    const updateUser = (id, user) => {
        if(user?.nickname)
            user.name = user.nickname;
        return Users.findByIdAndUpdate(id, user);
    }

    const voteStation = async (stationID, user) => {
        let wasLiked = false;
        if(user.likes.includes(stationID)){
            const index = user.likes.indexOf(stationID);
            user.likes.splice(index, 1);
            wasLiked = true;
        }
        else{
            user.likes.push(stationID);
            wasLiked = false;
        }
        await updateUser(user._id, user);
        return wasLiked;
    }

    const reportStation = async (stationID, user) => {
        let wasReported = false;
        if(user.reports.includes(stationID)){
            wasReported = true;
        }
        else{
            user.reports.push(stationID);
            wasReported = false;
        }
        await updateUser(user._id, user);
        return wasReported;
    }

    const setProfilePicture = async (id, imageURL) => {  
        return Users.findByIdAndUpdate(id, {profilePicture: imageURL});
    }

    const setLastMessage = async (id, message) => {  
        return Users.findByIdAndUpdate(id, {lastMessage: message});
    }

    return {
        getByEmail,
        getById,
        create,
        getAll,
        deleteUser,
        feedUserToWeb,
        getVehicleConfig,
        setVehicleConfig,
        deleteVehicleConfig,
        updateUser,
        voteStation,
        reportStation,
        setProfilePicture,
        setFavourites,
        setAchievement,
        getAchievements,
        getLikes,
        banUser,
        setLastMessage,
    }
}

module.exports = userService;
