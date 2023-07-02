const Joi = require('joi');
const { StatusCodes } = require("http-status-codes");

const userSchema = Joi.object({
  firstname: Joi.string().required().min(3).max(20).messages({
    'any.required': 'First name is required',
    'string.min': 'First name must be at least 3 characters',
    'string.max': 'First name cannot be more than 20 characters',
  }),
  lastname: Joi.string().required().min(3).max(20).messages({
    'any.required': 'Last name is required',
    'string.min': 'Last name must be at least 3 characters',
    'string.max': 'Last name cannot be more than 20 characters',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
  }),
  gender: Joi.string().valid('male', 'female', 'others'),
  role: Joi.string().valid('admin', 'manager', 'user'),
  dateOfBirth: Joi.date(),
  phoneNumber: Joi.string().pattern(/^0\d{10}$/).messages({
    'string.pattern.base': 'Invalid phone number format. Phone numbers must start with 0 and have 11 digits',
  }),
  address: Joi.object({
    state: Joi.string(),
    country: Joi.string(),
  }),
}).options({ abortEarly: false });

const validateUser = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: error.details.map(err => err.message),
    });
  }
  next();
};

module.exports = validateUser;
