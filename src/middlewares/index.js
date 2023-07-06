const multer = require("./multer.middleware");
const { verifyAPIKey } = require("./APIKey.middleware");

module.exports = {
   multer,
   verifyAPIKey,
};
