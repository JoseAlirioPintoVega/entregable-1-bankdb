require('dotenv').config();

const { addListener } = require('nodemon');
const Server = require('./models/server');

const server = new Server();

server.listen();
