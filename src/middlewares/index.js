const multer = require('./multer.middleware');
const {verifyApikey} = require('./apikey.middleware');

module.exports = {
  multer,
  verifyApikey
};