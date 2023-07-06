const { StatusCodes } = require("http-status-codes");
const { projectService } = require("../models");
const { uuidUtil, organisationwWelcomeEmail } = require("../utils");
const { sendMail } = require("../services");

const newProject = async (req, res) => {
   try {
      //The project owner field should come from the middleware userPrivilege
      const { projectName, organisationName } = req.body;

      //Generate apikey
      const uniqueId = await uuidUtil.giveID();

      const APIKey = uniqueId.toLowerCase();
      const projectId = await uuidUtil.giveID();

      console.log(APIKey);

      // console.log("user", req.user);

      //create project
      await projectService.create({
         projectOwner: req.user._id,
         projectName,
         projectId,
         organisationName,
         APIKey,
      });

      //send email
      const emailType = "admin";
      const subject = "IMS API Key";
      const message = organisationwWelcomeEmail(organisationName, APIKey);

      sendMail(emailType, req.user.email, subject, message);

      //return response
      const data = {
         projectName,
         organisationName,
         APIKey,
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

const allProjects = async (req, res) => {
   try {
      const projects = await projectService
         .query({
            projectOwner: req.user._id,
         })
         .populate("projectOwner");

      const data = {
         projects,
      };

      return res
         .status(StatusCodes.OK)
         .json({ code: StatusCodes.OK, status: true, message: data });
   } catch (error) {
      return res.status(StatusCodes.OK).json({
         success: false,
         code: StatusCodes.INTERNAL_SERVER_ERROR,
         error: `Error testing : ${error.message}`,
      });
   }
};

const deleteProject = async (req, res) => {
   try {
      const { projectId } = req.params;

      //check if project exists and if it belongs to user;
      const project = await projectService.queryOne({ projectId });

      if (!project)
         return res.status(StatusCodes.OK).json({
            code: StatusCodes.NOT_FOUND,
            message: "Project with ID not found",
            status: false,
         });

      if (project.projectOwner !== req.user._id)
         return res.status(StatusCodes.OK).json({
            code: StatusCodes.UNAUTHORIZED,
            message: "Unauthorized",
            status: false,
         });

      await projectService.delete(projectId);

      return res.status(StatusCodes.OK).json({
         code: StatusCodes.OK,
         message: "Project deleted successfully",
         status: true,
      });
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
   allProjects,
   deleteProject,
};
