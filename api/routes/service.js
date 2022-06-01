const express = require('express');
const router = express.Router();
const Factory = require('../factory/factory');

const factory = Factory();
const serviceController = factory.createServiceController();

// api/service/closest
router.get('/closest', serviceController.getClosest);

// api/service/closestAvailable
router.get('/closestAvailable', serviceController.getClosestAvailable);

module.exports = router;