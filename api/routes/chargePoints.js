const express = require('express');
const router = express.Router();
const { chargePointsController } = require('../controllers');

// api/chargePoints
router.get('/', chargePointsController.getAll);

// api/chargePoints/:id
router.get('/:id', chargePointsController.getById);

module.exports = router;