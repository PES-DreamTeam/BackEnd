const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Factory = require('../factory/factory');

const factory = Factory();
const chargePointsController = factory.createChargePointsController();
const userService = factory.createUserService();
const my_auth = auth(userService);

// api/chargePoints
router.get('/', my_auth, chargePointsController.getAll);

// api/chargePoints/:id
router.get('/:id', my_auth, chargePointsController.getById);

// api/chargePoints/:id/info
router.get('/:id/info', my_auth, chargePointsController.getInfo);

// api/chargePoints/:id/vote
router.put('/:id/vote', my_auth, chargePointsController.voteStation);

// api/chargePoints/:id/report
router.put('/:id/report', my_auth, chargePointsController.reportStation);

// api/chargePoints/:id/report
router.get('/:id/reports', my_auth, chargePointsController.getReports);

// api/chargePoints/:id/nearest
router.get('/:id/nearest', my_auth, chargePointsController.getNearest);

module.exports = router;