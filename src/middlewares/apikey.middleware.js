const { StatusCodes } = require("http-status-codes");
//const requestIp = require("request-ip");
const { projectService } = require("../models");

const verifyAPIKey = async (req, res, next) => {
   try {
      //get apikey from header
      const APIKey = req.body.APIKey;

      console.log("API Key", req.body.APIKey);

      if (!APIKey) {
         return res.status(StatusCodes.UNAUTHORIZED).json({
            message: " API Key is required",
            status: false,
         });
      }

      const project = await projectService.queryOne({ APIKey });

      if(!project)return res.status(StatusCodes.NOT_FOUND).json({message: 'Invalid API key provided', status: false});

      return next();
   } catch (error) {
      console.log(error);
      return res.status(StatusCodes.OK).json({
         success: false,
         code: StatusCodes.INTERNAL_SERVER_ERROR,
         error: `Error testing : ${error.message}`,
      });
   }
};

module.exports = {
   verifyAPIKey,
};
