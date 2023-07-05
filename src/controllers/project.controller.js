const { StatusCodes } = require("http-status-codes");
const { projectService } = require("../models");
const { uuidUtil, organisationwWelcomeEmail } = require("../utils");
const { sendMail } = require("../services");

const newProject = async (req, res) => {
   try {
      //The project owner field should come from the middleware userPrivilege
      const { projectName, projectOwner, organisationName, applicationServerIP } =
         req.body;

      // const client_ip = req.headers['x-real-ip'] || req.socket.remoteAddress;

      const client_ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      console.log("IP ADDRESS", client_ip);

      //Generate apikey
      const uniqueId = await uuidUtil.giveID();

      const apikey = uniqueId.toLowerCase();

      console.log(apikey);

      //create project
      await projectService.create({
         projectName,
         organisationName,
         applicationServerIP,
         apikey,
      });

      //send email
      const emailType = "admin";
      const message = organisationwWelcomeEmail(institution_name, apikey);

      await sendMail(emailType, email, "IMS Apikey", message);

      //return response
      const data = {
         email,
         institution_name,
         software_name,
      };

      return res
         .status(StatusCodes.OK)
         .json({ code: StatusCodes.CREATED, status: true, message: data });
   } catch (error) {
      return res.status(StatusCodes.OK).json({
         success: false,
         code: StatusCodes.INTERNAL_SERVER_ERROR,
         error: `Error testing : ${error.message}`,
      });
   }
};

module.exports = {
   newProject,
};
