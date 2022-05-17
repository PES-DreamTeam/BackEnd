const express = require('express');
const router = express.Router();
const Factory = require('../factory/factory');

const factory = Factory();
const ChatController = factory.createChatController();

// api/achievements
router.get('/', ChatController.getAll);


module.exports = router;