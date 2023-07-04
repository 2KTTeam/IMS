const { sendMail } = require("../services");

function sendWelcomeEmail(recipient, firstname, lastname, email, password, token) {
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
      <p>Welcome to our platform. On behalf of the entire team at 2KTteam, we extend our warmest greetings and gratitude for choosing to register on our organization.</p>
      <p>Please find below your essential login credentials:</p>
      <p><strong>Token:</strong> ${token}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <br>
      <p>We kindly request you to keep this information secure and refrain from sharing it with anyone else. Your token plays a crucial role as it will be utilized to verify and retrieve your profile data.</p>
      <p>At 2KTteam, we prioritize the safety and confidentiality of your personal information. Rest assured that your trust in our platform is deeply valued, and we are committed to safeguarding your data.</p>
      <p>Thank you once again for placing your trust in 2KTteam! </p>
      <br>
      <p>Best regards,</p>
      <p>Toby,</p>
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
  welcomeUser:sendWelcomeEmail
};
