require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa');
    const tableNames = await sequelize.getQueryInterface().showAllTables();
    console.log('Tablas disponibles:', tableNames);
  } catch (error) { console.error('Imposible conectar:', error); }
})();

module.exports = sequelize;