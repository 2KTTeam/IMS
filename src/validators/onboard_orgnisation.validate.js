const Joi = require('joi');
const { StatusCodes } = require("http-status-codes");

const orgSchema = Joi.object({
  institution_name: Joi.string().required().min(3).messages({
    'any.required': 'Institution name is required',
    'string.min': 'Institution name must be at least 3 characters',
  }),
  software_name: Joi.string().required().min(3).messages({
    'any.required': 'App name is required',
    'string.min': 'App name must be at least 3 characters',
   
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required',
  }),
  application_server_ip: Joi.string().required().pattern(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/).messages({
    'string.pattern.base': 'Invalid ip number. Please provide a valid ip number',
  }),

  address: Joi.object({
    zip_code: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
  }).required().messages({
    'any.required': 'Office address is required'
  })

}).options({ abortEarly: false });

const validateOranisation = (req, res, next) => {
  const { error, value } = orgSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.OK).json({
      code: StatusCodes.BAD_REQUEST,
      success: false,
      error: error.details.map(err => err.message),
    });
  }
  next();
};

module.exports = validateOranisation;
