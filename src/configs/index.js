const DB = require('./db.config');
const ENV = require('./env.config');
const seedManager = require('./seeder');

module.exports = {
  DB,
  ENV,
  seedManager,
};
