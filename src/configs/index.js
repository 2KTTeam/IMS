const DB = require('./db.config');
const ENV = require('./env.config');
const {managerData} = require('./seeder');

module.exports = {
  DB,
  ENV,
  managerData
};
