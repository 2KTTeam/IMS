const { sendWelcomeEmail } = require('./welcome.email');
const { welcomeUser } = require('./users.email');
const {ProfileVerifyMail} = require('./verify.email');

module.exports = {
  sendWelcomeEmail,
  welcomeUser,
  ProfileVerifyMail
}