const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Factory = require('../factory/factory');

const factory = Factory();
const reportController = factory.createReportController();
const userService = factory.createUserService();
const my_auth = auth(userService);

// api/report
router.post('/', my_auth, reportController.reportApp);

module.exports = router;