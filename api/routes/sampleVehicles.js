const express = require('express');
const router = express.Router();
const { sampleVehiclesController } = require('../controllers');
const validate = require('../middlewares/validate');
const { sampleVehiclesValidation } = require('../validations');

// api/sampleVehicles
router.get('/', sampleVehiclesController.getAll);

// api/sampleVehicles
router.post('/', validate(sampleVehiclesValidation.create), sampleVehiclesController.create);

// api/sampleVehicles/:id
router.delete('/:id', sampleVehiclesController.deleteSampleVehicle);

module.exports = router;