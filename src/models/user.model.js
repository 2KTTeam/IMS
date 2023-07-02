const mongoose = require('mongoose');
const DbService = require('./data.service');
const allowedRoles = ['admin', 'manager', 'user'];
const allowedGender = ['male', 'female', 'others'];

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'userId is required']
  },
  firstname: {
    type: String,
    required: [true, 'First name is required.'],
    minlength: [3, 'First name must be at least 3 characters.'],
    maxlength: [20, 'First name cannot be more than 20 characters.']
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required.'],
    minlength: [3, 'Last name must be at least 3 characters.'],
    maxlength: [20, 'Last name cannot be more than 20 characters.']
  },
  role: {
    type: String,
    enum: allowedRoles,
    required: [true, "Please select a role"],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'Email already exists.'],
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [6, 'Password must be at least 6 characters.']
  },
  gender: {
    type: String,
    enum: allowedGender,
  },
  dateOfBirth: {
    type: Date
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return /^0\d{10}$/.test(value);
      },
      message: 'Invalid phone number format. Phone numbers must start with 0 and have 11 digits.'
    }
  },
  address: {
    state: {
      type: String
    },
    country: {
      type: String
    }
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

const userService = new DbService(User);

module.exports = {
  User,
  userService
};