const auth = require('./auth.controller');
const profile = require('./profile.controller');
const verify = require('./verify.controller');
const organisation= require('./organisation.controller')

module.exports = {
  auth,
  profile,
  verify,
  organisation
};