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
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <p>Please keep this information secure and do not share it with anyone.</p>
      <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
      <p>Thank you and enjoy your experience on our platform!</p>
      <p>Best regards,</p>
      <p>Your Company</p>
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