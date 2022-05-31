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
const { Server } = require('socket.io');
const io = new Server(server);

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {

        app.use(cors());
        app.use(bodyParser.json());

        app.get('/index', (req, res) => {
            res.sendFile(__dirname + '/index.html');
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

        io.on('connection', (socket) => {
            // console.log(socket);
            console.log('a user connected');
            console.log(socket.handshake);
        })
        
        server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

    }).catch(error => {
        console.log(error);
    })
