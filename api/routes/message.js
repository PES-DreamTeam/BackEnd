const express = require('express');
const router = express.Router();
const Factory = require('../factory/factory');

const factory = Factory();
const MsgController = factory.createMsgController();

// api/message
router.get('/', MsgController.getAll);

// api/message
router.post('/', MsgController.createMessage);


module.exports = router;