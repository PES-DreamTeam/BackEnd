const ChargePointsController = (dependencies) => {
    const { chargePointService } = dependencies;

    const getAll = async (req, res) => {
        try {
            const data = await chargePointService.get(null, req.query.groupBy, req.query.objectType);

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
    return {
        getAll,
        getById
    }
}


module.exports = ChargePointsController;