const express = require('express');
const router = express.Router();
const Factory = require('../factory/factory');
const factory = Factory();
const auth = require('../middlewares/auth');
const MsgController = factory.createMsgController();
const my_auth = auth(factory.createUserService());

// api/message
router.get('/', my_auth, MsgController.getAll);

// api/message/:id
router.get('/:id', my_auth, MsgController.getChatMsgs);

// api/message/last
router.get('/chat/last', my_auth, MsgController.getLastMsgAllUsers);

// api/message
router.post('/', my_auth, MsgController.createMessage);

// api/message/last
//router.get('/last', MsgController.getLastMessage);

module.exports = router;