require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  dbUrl: process.env.MONGO_URL,
  jwt: process.env.JWT_SECRET_KEY,
  TRB_API_KEY:process.env.TREBLLE_API_KEY,
  TRB_PROJ_ID:process.env.TREBLLE_PROJECT_ID
};