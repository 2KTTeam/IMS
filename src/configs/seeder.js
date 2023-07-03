const axios = require('axios');
const {port} = require('./env.config');

async function seedManager() {
  const postData = {
    firstname: "Manager",
    lastname: "Blue",
    email: "manager@gmail.com",
    password: "Manager123!",
    role: "manager",
    gender: "male",
    dateOfBirth: "1994-02-17",
    phoneNumber: "07067572151",
    address: {
      state: "Anambra",
      country: "Nigeria"
    }
  };

  try {
    const response = await axios.post(`http://localhost:${port}/api/v1/auth/register/manager`, postData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

module.exports = seedManager;
