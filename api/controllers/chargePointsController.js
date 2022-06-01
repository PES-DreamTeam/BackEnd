
const ChargePointsController = (dependencies) => {
    const { chargePointService, userService, toolController } = dependencies;

    const getAll = async (req, res) => {
        try {
            let favourites = null;
            if(req.query.userId){
                const user = await userService.getById(req.query.userId);
                favourites = await chargePointService.getChargePointsById(user.favourites);
            }

            const data = await chargePointService.get(null, req.query.groupBy, req.query.objectType, favourites);

            if(!data) return res.status(404).send({msg: "ChargePoint not found"});
            res.status(200).send({chargePoints:data});       
        } catch (error) {
            res.status(500).send({error: error.toString()});
        }
    }

    const getById = async (req, res) => {
        try {
            const data = await chargePointService.get(req.params.id, req.query.groupBy, null);

            if(!data) return res.status(404).send({msg: "ChargePoint not found"});
            res.status(200).send({chargePoint: data});
        } catch (error) {
            res.status(500).send({error: error.toString()});
        }
    }

    const getInfo = async (req, res) => {
        try {
            const data = await chargePointService.getInfo(req.params.id);

            if(!data) {
                const station = await toolController.setDefaultStations();
                return res.status(200).send({chargePoint: station});
            }
            res.status(200).send({chargePoint: data});
        } catch (error) {
            res.status(500).send({error: error.toString()});
        }
    }

    const voteStation = async (req, res) => {
        try {
            const stationID = req.params.id;
            const wasLiked = await userService.voteStation(stationID, req.user); //If user liked that station before, it will be removed from the list and return true. If not, it will be added to the list and return false.
            const station = await chargePointService.voteStation(stationID, wasLiked);
            const likedStations = await userService.getLikes(req.user.id);
            if(!station) return res.status(404).send({msg: "Station not found"});
            await chargePointService.feedStationToWeb(station)
            return res.status(200).send({likedStations});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const reportStation = async (req, res) => {
        try {
            const stationId = req.params.id;
            const wasReported = await userService.reportStation(stationId, req.user); 
            if(wasReported) return res.status(403).send({msg: "Station already reported"});
            const station = await chargePointService.reportStation(stationId, req.body, req.user);
            if(!station) return res.status(404).send({msg: "Station not found"});
            return res.status(200).send({user: await chargePointService.feedStationToWeb(station)});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const getReports = async (req, res) => {
        try {
            const stationID = req.params.id;
            const reports = await chargePointService.getReports(stationID);
            return res.status(200).send({reports: reports});
        }
        catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const getNearest = async (req, res) => {
        try {
            const stationID = req.params.id;
            const station = await chargePointService.get(stationID, "id", null);
            if(!station) return res.status(404).send({msg: "Station not found"});
            const lat = station[req.params.id].lat;
            const lng = station[req.params.id].lng;
            const howMany = req.query.howMany;
            const nearest = await chargePointService.getNearest(lat, lng, howMany);
            return res.status(200).send({nearest});
        }
        catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }
    
    return {
        getAll,
        getById,
        getInfo,
        voteStation,
        reportStation,
        getReports,
        getNearest,
    }    
}


module.exports = ChargePointsController;