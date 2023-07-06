const { StatusCodes } = require("http-status-codes");
const { projectService, Project } = require("../models");
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

      //check if organisation name is available
      const project = await projectService.queryOne({organisationName});

      if(project) return res.status(StatusCodes.CREATED).json({message: 'Project name is not available', status: false});

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
         .status(StatusCodes.CREATED)
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
      const projects = await Project.find({
         projectOwner: req.user.id,
      }).populate('projectOwner');


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

      if (!project){
         return res.status(StatusCodes.OK).json({
            code: StatusCodes.NOT_FOUND,
            message: "Project with ID not found",
            status: false,
         });
      }

      if (req.user._id !== project.projectOwner){
         return res.status(StatusCodes.OK).json({
            message: "Unauthorized",
            status: false,
         });
      }
         

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
