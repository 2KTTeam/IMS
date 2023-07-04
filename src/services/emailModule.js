const { sendMail } = require("./nodemailer.service"); // Assuming the code is saved in an "emailModule.js" file

// Example usage
const emailType = "verification";
const recipient = "fudosman@gmail.com";
const subject = "Hello testing this outgoing email";
const htmlContent = "<h1>This is a test email</h1>";

try {
  sendMail(emailType, recipient, subject, htmlContent);
  console.log("Email sent successfully");
} catch (error) {
  console.error("Error sending email:", error);
}
