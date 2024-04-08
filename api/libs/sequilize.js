const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('./../db/models/index')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Option 1: Passing a connection URI
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: console.log,
});

// Corremos nuestro modelo que contiene el esquema y la config pasandole la conexion como argumento
setupModels(sequelize);

// Hacemos sincronizacion para que tome esos modelo y haga la estructura
// *** UPDATE: Lo comentamos, ya que los cambios los iremos trackeando por medio de MIGRACIONES

// sequelize.sync({alter: true});

module.exports = sequelize;
