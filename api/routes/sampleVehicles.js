const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { sampleVehiclesValidation } = require('../validations');
const auth = require('../middlewares/auth');
const Factory = require('../factory/factory');
const factory = Factory(); 
const my_auth = auth(factory.createUserService());
const sampleVehiclesController = factory.createSampleVehicleController();
// api/sampleVehicles
// router.get('/', sampleVehiclesController.getAll);

// // api/sampleVehicles
// router.post('/', validate(sampleVehiclesValidation.create), sampleVehiclesController.create);

// // api/sampleVehicles/:id
// router.delete('/:id', sampleVehiclesController.deleteSampleVehicle);

// api/sampleVehicles/brands
router.get('/brands', my_auth, sampleVehiclesController.getBrands);

// api/sampleVehicles/models?brand=:brand
router.get('/models', my_auth, sampleVehiclesController.getModels);

module.exports = router;