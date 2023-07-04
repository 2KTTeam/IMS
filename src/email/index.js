const { sendWelcomeEmail } = require('./welcome.email');
const { welcomeUser } = require('./users.email');

module.exports = {
  sendWelcomeEmail,
  welcomeUser
}