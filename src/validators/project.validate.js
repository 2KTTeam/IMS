const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

const projectSchema = Joi.object({
   projectName: Joi.string().required().min(3).messages({
      "any.required": "Project name is required",
      "string.min": "Project name must be at least 3 characters",
   }),
   organisationName: Joi.string().required().min(3).messages({
      "any.required": "Organisation name is required",
      "string.min": "Organisation name must be at least 3 characters",
   }),
   applicationServerIP: Joi.string()
      .required()
      .pattern(
         /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      )
      .messages({
         "string.pattern.base": "Invalid IP address. Please provide a valid IP adress",
      }),
}).options({ abortEarly: false });

const validateProject = (req, res, next) => {
   const { error, value } = projectSchema.validate(req.body);
   if (error) {
      return res.status(StatusCodes.OK).json({
         code: StatusCodes.BAD_REQUEST,
         success: false,
         error: error.details.map((err) => err.message),
      });
   }
   next();
};

module.exports = validateProject;
