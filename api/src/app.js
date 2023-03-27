const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const server = express();
const verifyToken = require('./middlewares/verifyToken');


require("./data/connection");
const { urlFront } = require('./config/config.js');

const corsOptions = { origin: urlFront };

server.use(express.json());
server.use(morgan('dev'));
server.use(cors(corsOptions))
server.use('/api', verifyToken, routes);

module.exports = server;
