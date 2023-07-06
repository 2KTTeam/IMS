const multer = require("./multer.middleware");
const { verifyAPIKey } = require("./apikey.middleware");

module.exports = {
   multer,
   verifyAPIKey,
};
