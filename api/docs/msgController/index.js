const createMessage = require('./createMessage');
const getAllMsg = require('./getAllMsg');
const getChatMsgs = require('./getChatMsgs');
const getLastMsgAllUsers = require('./getLastMsgAllUsers');
//const getLastMessage = require('./getLastMessage');

module.exports = {
    createMessage: createMessage,
    getAllMsg: getAllMsg,
    //getLastMessage: getLastMessage,
    getChatMsgs: getChatMsgs,
    getLastMsgAllUsers: getLastMsgAllUsers
}