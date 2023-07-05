const mongoose = require("mongoose");
const DbService = require("./data.service");

const projectSchema = new mongoose.Schema(
   {
      projectName: {
         type: String,
         required: [true, "Project name is required"],
      },
      projectOwner: {
         type: String,
         required: [true, "Project owner is required"],
      },
      apikey: {
         type: String,
      },
      organisationName: {
         type: String,
         required: [true, "Organisation name is required"],
      },
      applicationServerIP: {
         type: String,
         required: [true, "Server ip is required"],
      },
   },
   {
      timestamps: true,
   }
);

const Project = mongoose.model("Project", projectSchema);
const projectService = new DbService(Project);

module.exports = {
   Project,
   projectService,
};
