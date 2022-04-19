const express = require('express');
const router = express.Router();
const Factory = require('../factory/factory');

const factory = Factory();
const toolController = factory.createToolController();

// api/tools/bike
router.get('/bike', toolController.getBike);

//Popula Default stations /api/tools/defaultStations
router.get('/defaultStations', toolController.setDefaultStations);

//Popula Report stations /api/tools/reportStations
router.get('/reportStations', toolController.setReportStations);

module.exports = router;