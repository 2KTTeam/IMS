const {owners_email,owners_password} = require('./env.config');

const managerData = {
  firstname: "Manager",
  lastname: "Blue",
  email: owners_email,
  password: owners_password,
  role: "manager",
  gender: "male",
  dateOfBirth: "1994-02-17",
  phoneNumber: "07067572151",
  address: {
    state: "Anambra",
    country: "Nigeria"
  }
};

module.exports = {
  managerData
};
