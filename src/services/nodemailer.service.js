const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const emailAddresses = {
  verification: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS_1,
      pass: process.env.EMAIL_PASSWORD_1,
    },
  },
  welcome: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS_2,
      pass: process.env.EMAIL_PASSWORD_2,
    },
  },
  admin: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS_3,
      pass: process.env.EMAIL_PASSWORD_3,
    },
  },
};

function createTransport(email) {
  const config = emailAddresses[email];
  console.log(config);
  if (!config) {
    throw new Error(`Invalid email address: ${email}`);
  }
  return nodemailer.createTransport(config);
}

async function sendMail(email, to, subject, html, from = '"2KTteam" <noreply@2KTteam.com>') {
  const transport = createTransport(email);
  await transport.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html,
  });
  await transport.close();
}

module.exports = {
  sendMail
};