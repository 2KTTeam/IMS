const axios = require('axios');

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
    const response = await axios.post('http://localhost:3000/api/v1/auth/register', postData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

module.exports = seedManager;
