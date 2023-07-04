const { sendMail } = require("../services");

function ProfileVerifyMail(recipient, firstname, lastname, UserToken) {
  const emailType = "verification";
  const subject = "Profile Verification Token";
  const htmlContent = `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Profile Verification Token</title>
      </head>
      <body>
        <h2>Profile Verification Token</h2>
        <p>Dear ${firstname} ${lastname},</p>
        <p>We are pleased to provide you with a profile verification token.</p>
        <p><strong>Verification Token: ${UserToken}</strong></p>
        <p>Use this token to complete the account verification process and gain access to your profile.</p>
        <p>If you have any questions or need assistance, please feel free to contact our support team.</p>
        <br>
        <p>Best regards,</p>
        <p>Kenechukwu</p>
        <p>2KTteam</p>
      </body>
    </html>
  `;

  try {
    sendMail(emailType, recipient, subject, htmlContent);
    console.log("Profile Verification email sent successfully");
  } catch (error) {
    console.error("Error sending Profile Verification email:", error);
  }
}

module.exports = {
  ProfileVerifyMail
};

