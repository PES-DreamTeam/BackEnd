const ServiceController = (dependencies) => {
    const { chargePointService } = dependencies; 

    const getClosest = async (req, res) => {
        try {
            const lat = req.query.lat;
            const lng = req.query.lng;
            const howMany = req.query.howMany;
            const nearest = await chargePointService.getNearest(lat, lng, howMany);
            return res.status(200).send({nearest});
        }
        catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    /*
        query -> lat, lng, distance
    */

    const getClosestAvailable = async (req, res) => {
        try {
            const lat = req.query.lat;
            const lng = req.query.lng;
            const distance = req.query.distance;
            const nearest = await chargePointService.getNearestAvailable(lat, lng, distance);
            return res.status(200).send({nearest});
        }
        catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    return {
        getClosest,
        getClosestAvailable
    }

}
module.exports = ServiceController;