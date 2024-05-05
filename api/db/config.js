const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
let URI = 'mysql://root:VnlvwusBidnyttmmAMZeSZRSlWbTDhXk@roundhouse.proxy.rlwy.net:50287/railway';

/* if (config.env == 'production') {
  URI = config.mysqlUrl;
} else {
  URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
} */

module.exports = {
  development: {
    url: URI,
    dialect: 'mysql',
  },
  production: {
    url: URI,
    dialect: 'mysql',
  }
}
