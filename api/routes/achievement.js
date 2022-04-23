const express = require('express');
const router = express.Router();
const Factory = require('../factory/factory');

const factory = Factory();
const achievementController = factory.createAchievementController();

// api/achievements
router.get('/', achievementController.getAll);

// api/achievements/:id
router.get('/:id', achievementController.getById);


module.exports = router;