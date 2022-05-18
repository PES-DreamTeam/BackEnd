const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { sampleVehiclesValidation } = require('../validations');
const Factory = require('../factory/factory');
const factory = Factory(); 
const sampleVehiclesController = factory.createSampleVehicleController();
// api/sampleVehicles
// router.get('/', sampleVehiclesController.getAll);

// // api/sampleVehicles
// router.post('/', validate(sampleVehiclesValidation.create), sampleVehiclesController.create);

// // api/sampleVehicles/:id
// router.delete('/:id', sampleVehiclesController.deleteSampleVehicle);

// api/sampleVehicles/brands
router.get('/brands', sampleVehiclesController.getBrands);

// api/sampleVehicles/models?brand=:brand
router.get('/models', sampleVehiclesController.getModels);

module.exports = router;