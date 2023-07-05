const auth = require('./auth.service');
const { uploadMedia } = require('./cloudinary.service');
const { sendMail } = require('./nodemailer.service');

module.exports = {
  auth,
  uploadMedia,
  sendMail
}