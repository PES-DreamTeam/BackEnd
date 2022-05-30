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

//Popula highlights /api/tools/highlight
router.post('/highlight', toolController.publishHighlight);

//Gets all highlights /api/tools/highlight
router.get('/highlight', toolController.getHighlights);

//Gets a specific highlight /api/tools/highlight/:id
router.get('/highlight/:id', toolController.getHighlightById);

// Popula achievements als users api/tools/achievements
router.get('/achievements', toolController.setAchievements);

module.exports = router;