const auth = require('./auth.service');
const { uploadMedia,deleteMedia } = require('./cloudinary.service');
const { sendMail } = require('./nodemailer.service');

module.exports = {
  auth,
  uploadMedia,
  deleteMedia,
  sendMail
}