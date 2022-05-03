const ServiceController = (dependencies) => {
    const { chargePointService } = dependencies; 

    const getClosest = async (req, res) => {
        try {
            console.log("Me estan llamando con esto:");
            console.log(req.query.lat);
            console.log(req.query.lng);
            console.log(req.query.howMany);
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

    return {
        getClosest
    }

}
module.exports = ServiceController;