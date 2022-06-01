const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Factory = require('../factory/factory');

const factory = Factory();
const reportController = factory.createReportController();
const userService = factory.createUserService();
const my_auth = auth(userService);
const admin_auth = auth(userService, true);
// api/report
router.post('/', my_auth, reportController.reportApp);

// api/report/getReports?reportType={'station'|'app'}
router.get('/getReports', my_auth, reportController.getReports);

// api/report/markAsResolved?stationId={stationId}&reportId={reportId}&reportType={'station'|'app'}
router.put('/markAsResolved', admin_auth, reportController.markAsResolved);

module.exports = router;