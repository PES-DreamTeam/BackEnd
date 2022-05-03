const express = require('express');
const router = express.Router();
const Factory = require('../factory/factory');

const factory = Factory();
const serviceController = factory.createServiceController();

// api/service/closest
router.get('/closest', serviceController.getClosest);

module.exports = router;