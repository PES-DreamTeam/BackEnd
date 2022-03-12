const { sampleVehicleService } = require('../services');

const getAll = async (req, res) => {
    try {
       const vehicles = await sampleVehicleService.getAll(req.query.groupBy); 
        if(vehicles)
            return res.status(200).send({ vehicles });
        else
            return res.status(404).send({msg: "No vehicles found"});
    } catch (error) {
       return res.status(500).send({msg: error.toString()}); 
    }
}

const create = async (req, res) => {
    try {
        const created = await sampleVehicleService.create(req.body);
        if(created)
            return res.status(201).send({ msg: "Vehicle created", vehicle: created });
        else
            return res.status(500).send({msg: "Error creating vehicle"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({msg: error.toString()});
    }
}

const deleteSampleVehicle = async (req, res) => {
    try {
        const deleted = await sampleVehicleService.deleteSampleVehicle(req.params.id);
        if(deleted)
            return res.status(200).send({ msg: "Vehicle deleted" });
        else
            return res.status(404).send({msg: "Vehicle not found"});
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}

module.exports = {
    getAll,
    create,
    deleteSampleVehicle
}