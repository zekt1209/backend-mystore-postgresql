const { Pool } = require('pg');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Conexion hardcodeada
/* const pool = new Pool({
  host: 'localhost',
  port: '5432',
  user: 'victor',
  password: 'admin123',
  database: 'my_store'
}); */

// Mandando variables de entorno para la conexion
const pool = new Pool({ connectionString: URI });

module.exports = pool;

