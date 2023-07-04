const { sendMail } = require("../services");

function sendWelcomeEmail(recipient, firstname, lastname, email, password) {
  const emailType = "verification";
  const subject = "Welcome to Our Platform";
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Welcome Email</title>
    </head>
    <body>
      <h2>Welcome to Our Platform</h2>
      <p>Dear ${firstname} ${lastname},</p>
      <p>Welcome to our platform as an Admin staff member. We are excited to have you on board!</p>
      <p>Below are your login credentials:</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please keep this information secure and do not share it with anyone.</p>
      <p>This will be used for your authentication while registering users.</p>
      <p>Thank you for accepting the role of an Admin on 2KTteam!</p>
      <br>
      <p>Best regards,</p>
      <p>Douglas,</p>
      <p>2KTteam</p>
    </body>
    </html>
  `;

  try {
    sendMail(emailType, recipient, subject, htmlContent);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

module.exports = {
  sendWelcomeEmail
};