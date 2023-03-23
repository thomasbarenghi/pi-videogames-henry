const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const server = express();
const verifyToken = require('./middlewares/verifyToken');


require("./data/connection");
const { urlFront } = require('./config/config.js');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // límite de 100 solicitudes por minuto
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo en unos minutos'
});

const corsOptions = { origin: urlFront };

server.use(express.json());
server.use(morgan('dev'));
server.use(cors(corsOptions))
server.use(limiter);
server.use('/api', verifyToken, routes);

module.exports = server;
