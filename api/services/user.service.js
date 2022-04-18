const User = require("../models/User");
const imgbbUploader = require("imgbb-uploader");

const userService = (dependencies) => {
    const { Users, VehicleInstances, DefaultStations } = dependencies;

    /* istanbul ignore next */ 
    const getByEmail = (email) => {
        return Users.findOne({ email });
    }

    /* istanbul ignore next */ 
    const getById = (_id) => {
        return Users.findById(_id);
    }

    /* istanbul ignore next */ 
    const create = (user) => {
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
            favourites: user.favourites
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

    /* istanbul ignore next */ 
    const updateUser = (id, user) => {
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
            const index = user.reports.indexOf(stationID);
            user.reports.splice(index, 1);
            wasReported = true;
        }
        else{
            user.reports.push(stationID);
            wasReported = false;
        }
        await updateUser(user._id, user);
        return wasReported;
    }

    const setProfilePicture = async (id, image) => {
        let imageURL = null;
        const options = {
            apiKey: process.env.IMGBB_APIKEY,
            base64string: image,
        };
        const response = await imgbbUploader(options);
        imageURL = response.url;
        return Users.findByIdAndUpdate(id, {profilePicture: imageURL});
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
        updateUser,
        voteStation,
        reportStation,
        setProfilePicture,
        setFavourites
    }
}

module.exports = userService;
