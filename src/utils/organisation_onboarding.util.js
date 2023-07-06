const organisationwWelcomeEmail = (orgname, apikey) => {
  return `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to IMS</h2>
        <p>Dear ${orgname},</p>
        
        <p>Congratulations on registering with IMS. We are excited to have you on board!</p>
        
        <p>As a registered member, we are pleased to provide you with an API key. This key will allow you to access and utilize our APIs, empowering you to integrate our services seamlessly into your applications.</p>
        
        <p>Here are the details regarding your API key:</p>
        <ul>
            <li><strong>API Key:</strong> ${apikey}</li>
            <li><strong>Usage Documentation:</strong>  "https://documenter.getpostman.com/view/19482223/2s93zB51bY"</li>
        </ul>
        
        <p>Please ensure that you keep this API key confidential and securely store it within your organization. It grants access to sensitive data and resources within our system.</p>
        
        <p>If you require any assistance or have any questions regarding the usage of our API, please feel free to reach out to our support team on 07067572151. We are here to help you every step of the way.</p>
        
        <p>Once again, welcome to IMS. We are excited to collaborate with you and see the innovative solutions you create with our API. Thank you for choosing us as your trusted partner.</p>
        
        <p>Best regards,<br>
        kennysuccesskay@gmail.com</p>
        2kTteam<br>
    </div>
</body>
</html>

  `
}

module.exports = {
  organisationwWelcomeEmail
}