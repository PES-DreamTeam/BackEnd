const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Factory = require('../factory/factory');

const factory = Factory();
const chargePointsController = factory.createChargePointsController();
const userService = factory.createUserService();
const my_auth = auth(userService);

// api/chargePoints
router.get('/', chargePointsController.getAll);

// api/chargePoints/:id
router.get('/:id', chargePointsController.getById);

// api/chargePoints/:id/info
router.get('/:id/info', chargePointsController.getInfo);

// api/chargePoints/:id/vote
router.put('/:id/vote', my_auth, chargePointsController.voteStation);

// api/chargePoints/:id/report
router.put('/:id/report', my_auth, chargePointsController.reportStation);

// api/chargePoints/:id/report
router.get('/:id/reports', chargePointsController.getReports);

module.exports = router;