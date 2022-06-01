require('dotenv').config({path: '../.env'});

const UsersController = (dependencies) => {
    const { userService, chargePointService } = dependencies;


    const getAll = async (req, res) => {
        try {
            const users = await userService.getAll();
            const result = await Promise.all(users.map( async user => await userService.feedUserToWeb(user)))
            return res.status(200).send({ result });
        } catch (error) {
        return res.status(500).send({msg: error.toString()});
        }
    }

    const getById = async (req, res) => {
        try {
            const user = await userService.getById(req.params.id);
            if(!user) return res.status(404).send({msg: "User not found"});
            return res.status(200).send({user: await userService.feedUserToWeb(user)});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const updateUser = async (req, res) => {
        try {
            const user = await userService.updateUser(req.user.id, req.body);
            if(!user) return res.status(404).send({msg: "User not found"});

            return res.status(200).send({user: await userService.feedUserToWeb(user)});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const deleteUser = async (req, res) => {
        try {
            const user = await userService.getById(req.params.id);
            if(!user) return res.status(404).send({msg: "User not found"});

            if(user._id.toString() === req.user.id.toString()) {
                await userService.deleteUser(user._id);
                return res.status(200).send({msg: "User deleted"});
            }else {
                return res.status(403).send({msg: "You are not authorized"});
            }
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setProfilePicture = async (req, res) => {
        try {
            //if users_ids ==
            const user = await userService.setProfilePicture(req.params.id, req.body.image);
            if(!user) return res.status(404).send({msg: "User not found"});
            return res.status(200).send({user: await userService.feedUserToWeb(user)});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setLastMessage = async (req, res) => {
        try {
            const user = await userService.setLastMessage(req.params.id, req.body.text);
            if(!user) return res.status(404).send({msg: "User not found"});
            return res.status(200).send({user: await userService.feedUserToWeb(user)});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const getVehicleConfig = async (req, res) => {
        try {
            const user = await userService.getById(req.params.id);
            if(!user) return res.status(404).send({msg: "User not found"});
            const vehicleConfig = await userService.getVehicleConfig(user._id, req.body.numberPlate);
            if(!vehicleConfig) return res.status(404).send({msg: "Vehicle not found"});
            return res.status(200).send({vehicleConfig});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setVehicleConfig = async (req, res) => {
        try {
            if(req.params.id !== req.user.id) return res.status(401).send({msg: 'You are not authorized'});
            const bodyRequest = req.body;
            bodyRequest.user_id = req.params.id
            const existingVehicleConfig = await userService.getVehicleConfig(bodyRequest.numberPlate);
            if(existingVehicleConfig)
                return res.status(409).send({attribute:"NumberPlate", error: "The number plate already exists"});

                const vehicleConfig = await userService.setVehicleConfig(bodyRequest);
                if (vehicleConfig) {

                    await userService.updateUser(req.params.id, {"isNew":false});
                    var user = await userService.getById(req.params.id);
                    user = await userService.feedUserToWeb(user);

                    return res.status(200).send({user});
                }
                else return res.status(500).send({msg: "There has been an error saving the configuration"})

        } catch (error) {
            return res.status(500).send({msg: error});
        }
    }

    const deleteVehicleConfig = async (req, res) => {
        try {
            if(req.params.id !== req.user.id) return res.status(401).send({msg: 'You are not authorized'});
            const vehicleConfig = await userService.deleteVehicleConfig(req.params.numberPlate);
            if(!vehicleConfig) return res.status(404).send({msg: "Vehicle configuration not found"});
            return res.status(200).send({msg: "Vehicle configuration deleted"});
        } catch (error) {
            return res.status(500).send({msg: error});
        }
    }

    const getBike = async (req, res) => {
        try {
            const bike = await axios.get('https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_information');
            const data = bike.data.data.stations.map(bikeStation => {
                return {
                    station_id: bikeStation.station_id,
                    name: bikeStation.name,
                    lat: bikeStation.lat,
                    lng: bikeStation.lon,
                    address: bikeStation.address,
                    postCode: bikeStation.post_code,
                }
            });
            data.forEach(element => {
                BikeStation.create(element);
            });
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const getFavourites = async (req, res) => {
        try {
            const user = req.user;
            const favouritesPoints = await chargePointService.getChargePointsById(user.favourites, "id");
            return res.status(200).send({favouritesPoints});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setFavourites = async (req, res) => {
        try {
            if(req.params.id !== req.user.id) return res.status(401).send({msg: 'You are not authorized'});
            const bodyRequest = req.body;
            const user = await userService.getById(req.params.id);
            const station = await userService.setFavourites(bodyRequest.station_id, user);
            if(!station) return res.status(404).send({msg: "Station not found"});
            return res.status(200).send({user: await userService.feedUserToWeb(user)});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }
    const getAchievements = async (req, res) => {
        try {
            const achievements = await userService.getAchievements(req.params.id);
            return res.status(200).send({achievements});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setAchievement = async (req, res) => {
        try {
            if(req.params.id !== req.user.id) return res.status(401).send({msg: 'You are not authorized'});
            const bodyRequest = req.body;
            const user = await userService.getById(req.params.id);
            const achievement = await userService.setAchievement(bodyRequest, user);
            if(!achievement) return res.status(404).send({msg: "Achievement not found"});
            await userService.feedUserToWeb(user);
            return res.status(200).send({achievement: achievement});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const getLikes = async (req, res) => {
        try {
            const likes = await userService.getLikes(req.params.id);
            return res.status(200).send({likes});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }
    
    const banUser = async (req, res) => {
        try {
            const user = await userService.banUser(req.params.id);
            if(!user) return res.status(404).send({msg: "User not found"});
            return res.status(200).send({msg: !user.banned ? "User banned":"User unbanned"});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    } 

    return {
        getAll,
        getById,
        deleteUser,
        getVehicleConfig,
        setVehicleConfig,
        deleteVehicleConfig,
        updateUser,
        setProfilePicture,
        getBike,
        getFavourites,
        setFavourites,
        getLikes,
        setFavourites,
        getAchievements,
        setAchievement,
        banUser,
        setLastMessage,
    }
}

module.exports = UsersController; 
