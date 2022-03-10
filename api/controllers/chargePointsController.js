const { chargePointService } = require('../services');

const getAll = async (req, res) => {
    try {
        const data = await chargePointService.get(req.query);
        res.status(200).send({chargePoints:data});       
    } catch (error) {
        console.log(error.toString());
        res.status(500).send({error: error.toString()});
    }
}

const getById = (req, res) => {

}

module.exports = {
    getAll,
    getById,
}