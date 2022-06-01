
const DefaultStation = require("../models/DefaultStation");

const ToolController = (dependencies) => {
    const { BikeStations, axios, chargePointService, Highlights, Achievements, Users } = dependencies;
    const getBike = async (req, res) => {
        try {
            const bike = await axios.get('https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_information');
            const data = bike.data.data.stations.map(bikeStation => {
                return {
                    station_id: bikeStation.station_id.toString(),
                    name: bikeStation.name,
                    lat: bikeStation.lat,
                    lng: bikeStation.lon,
                    address: bikeStation.address,
                    postCode: bikeStation.post_code,
                }
            });
            data.forEach(element => {
                BikeStations.create(element);
            });
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const publishHighlight = async (req, res) => {
        try {
            const result = await Highlights.create({
                name: req.body.name,
                address: req.body.address,
                lat: req.body.lat,
                lng: req.body.lng,
                website: req.body.website,
                phone: req.body.phone,
                objectType: "highlight"
            });
            await chargePointService.createDefaultStation({
                station_id: 10009,
            });
            return res.status(200).send(result);
        }catch(error){
            return res.status(500).send({msg: error.toString()});
        }
    }

    const getHighlights = async (req, res) => {
        try {
            const result = await Highlights.find();
            return res.status(200).send(result);
        }catch(error){
            return res.status(500).send({msg: error.toString()});
        }
    }

    const getHighlightById = async (req, res) => {
        try {
            const result = await Highlights.findOne({id: req.params.id});
            return res.status(200).send(result);
        }catch(error){
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setDefaultStations = async (req, res) => {
        try {
            let returnStation = null;
            const stations = await DefaultStation.find();
            const stationIds = stations.map(station => station.station_id);
            const data = await chargePointService.get(null, 'id', null, null);
            for(const element in data){
                if (!stationIds.includes(parseInt(element))) {
                    returnStation = chargePointService.createDefaultStation({
                        station_id: element,
                    });
                }
            }
            return returnStation;
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setReportStations = async (req, res) => {
        try {
            const data = await chargePointService.get(null, 'id', 'default');
            for(const element in data){
                chargePointService.createReportStation({
                    station_id: element,
                });
            }
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }
    
    const setAchievements = async (req, res) => {
        //set all the achievements for every user
        let allUsers = await Users.find();
        let allAchievements = await Achievements.find();
        allUsers.forEach(user => {
            user.achievements = [];
            allAchievements.forEach(achievement => {
                user.achievements.push({
                    achievement_id: achievement.achievement_id,
                    achievement_tier: achievement.achievement_tier,
                    progress: 0,
                    objective: achievement.objective,
                });
            });
        }
        );
        allUsers.forEach(user => {
            user.save();
        }
        );
    }

    
    return {
        getBike,
        setDefaultStations,
        publishHighlight,
        getHighlights,
        getHighlightById,
        setReportStations,
        setAchievements,
    }
}

module.exports = ToolController;