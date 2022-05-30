const express = require('express');
const router = express.Router();
const Factory = require('../factory/factory');
const auth = require('../middlewares/auth');
const factory = Factory();
const achievementController = factory.createAchievementController();
const my_auth = auth(factory.createUserService());

// api/achievements
router.get('/', my_auth, achievementController.getAll);

// api/achievements/:id
router.get('/:id', my_auth, achievementController.getById);


module.exports = router;