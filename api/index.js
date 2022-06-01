const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: '../.env'});
const PORT = process.env.PORT || 8080;
const { Auth, User, ChargePoints, SampleVehicles, Report, Achievements, Service, Messages } = require('./routes');
const tools = require('./tools/tools');
const docs = require('./docs');
const swaggerUI = require('swagger-ui-express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: '*',
    }
})
const Factory = require('./factory/factory');
const factory = Factory();
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("hola")
        app.use(cors());
        app.use(bodyParser.json());

        app.get('/index', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        })
        io.on('connection', async (socket) => {
            const messageService = factory.createMsgService()
            userId = socket.handshake.query.userId;
            if(userId === '-1'){
                socket.join("-1");
            }else{
                socket.join(userId);
            }
            console.log(socket.id);
            console.log("socket nuevo");

            socket.on('sendMessage', async (message) => {
                const newMessage = await messageService.createMessage(message);
                socket.to(newMessage.chat_id.toString()).emit('newMessage', newMessage);
                const lastMessages = await messageService.getLastMsgAllUsers(); 
                io.to("-1").emit("chats", lastMessages);
            })
            socket.on('join', (chatId) =>{
                socket.join(chatId)
                socket.join("-1");
                console.log(socket.rooms);
            })
            socket.on("disconnect", () => {
                console.log("user disconnected");
            })
        })

        app.post('/message', async (req, res) => {
            const messageService = factory.createMsgService()
            const newMessage = await messageService.createMessage(req.body);
            io.to(newMessage.chat_id.toString()).emit('newMessage', newMessage);
            const lastMessages = await messageService.getLastMsgAllUsers(); 
            io.to("-1").emit("chats", lastMessages);           
        })

        app.use('/api/auth', Auth);
        app.use('/api/users', User);
        app.use('/api/chargePoints', ChargePoints);
        app.use('/api/sampleVehicles', SampleVehicles);
        app.use('/api/report', Report);
        app.use('/api/achievements', Achievements);
        app.use('/api/message', Messages);

        app.use('/api/tools', tools);
        app.use('/api/service', Service);
        
        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

        app.get('/*', (req, res) => res.redirect('/api-docs'));
        
        server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

    }).catch(error => {
        console.log(error);
    })
