
const ChargePointsController = (dependencies) => {
    const { chargePointService, userService } = dependencies;

    const getAll = async (req, res) => {
        try {
            const data = await chargePointService.get(null, req.query.groupBy, req.query.objectType, req.query.userId);

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

            if(!data) return res.status(404).send({msg: "ChargePoint not found"});
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
            if(!station) return res.status(404).send({msg: "Station not found"});
            return res.status(200).send({user: await chargePointService.feedStationToWeb(station)});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const reportStation = async (req, res) => {
        try {
            const reportType = req.body.reportType;
            const reportMsg = req.body.reportMsg;
            const stationID = req.params.id;
            console.log(stationID);
            const wasReported = await userService.reportStation(stationID, req.user); 
            console.log(wasReported);
            if(wasReported) return res.status(403).send({msg: "Station already reported"});
            const station = await chargePointService.reportStation(stationID, reportType, reportMsg);
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
    
    return {
        getAll,
        getById,
        getInfo,
        voteStation,
        reportStation,
        getReports
    }    
}


module.exports = ChargePointsController;