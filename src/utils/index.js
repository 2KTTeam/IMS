const docs = require('./docs.page');
const home = require('./home.page');
const uuidUtil = require('./uuid.util');
const passwordUtil = require('./password.util');
const jwt = require('./jwt.util');
const verification_token = require('./verificationId.util');
const generateOTP = require('./otp.util');


module.exports = {
  docs,
  home,
  uuidUtil,
  passwordUtil,
  jwt,
  verification_token,
  generateOTP,
};