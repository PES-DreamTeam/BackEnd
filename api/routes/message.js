const express = require('express');
const router = express.Router();
const Factory = require('../factory/factory');

const factory = Factory();
const MsgController = factory.createMsgController();

// api/message
router.get('/', MsgController.getAll);

// api/message/:id
router.get('/:id', MsgController.getChatMsgs);

// api/message/last
router.get('/last', MsgController.getLastMsgAllUsers);

// api/message
router.post('/', MsgController.createMessage);

// api/message/last
//router.get('/last', MsgController.getLastMessage);

module.exports = router;