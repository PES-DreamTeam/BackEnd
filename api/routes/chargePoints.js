const express = require('express');
const router = express.Router();
const Factory = require('../factory/factory');
const factory = Factory();

const chargePointsController = factory.createChargePointsController();

// api/chargePoints
router.get('/', chargePointsController.getAll);

// api/chargePoints/:id
router.get('/:id', chargePointsController.getById);

module.exports = router;