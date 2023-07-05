require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  dbUrl: process.env.MONGO_URL,
  jwt: process.env.JWT_SECRET_KEY,
  TRB_API_KEY:process.env.TREBLLE_API_KEY,
  TRB_PROJ_ID:process.env.TREBLLE_PROJECT_ID,
  cloudinary_name: process.env.CLOUDINARY_API_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  owners_email: process.env.OWNERS_EMAIL_ADDRESS,
  owners_password: process.env.OWNERS_PASSWORD,
};