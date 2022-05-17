const SampleVehiclesController = (dependencies) => {
    const { sampleVehicleService } = dependencies;
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

    const getBrands = async (req, res) => {
        try {
            const brands = await sampleVehicleService.getBrands();
            return res.status(200).send({brands});
        } catch (error) {
           return res.status(500).send({msg: error.toString()}); 
        }
    }

    const getModels = async (req, res) => {
        try {
            const models = await sampleVehicleService.getModels(req.query.brand);
            return res.status(200).send({models});
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    return {
        getAll,
        create,
        deleteSampleVehicle,
        getBrands,
        getModels
    }
}

module.exports = SampleVehiclesController;