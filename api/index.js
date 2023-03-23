const server = require('./src/app.js');
const connection = require('./src/data/connection.js');
require('dotenv').config();
const { PORT } = process.env;

connection.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
});
