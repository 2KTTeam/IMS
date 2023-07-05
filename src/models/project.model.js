const mongoose = require("mongoose");
const DbService = require("./data.service");

const projectSchema = new mongoose.Schema(
   {
      applicationServerIP: {
         type: String,
         required: [true, "Server ip is required"],
      },
      projectName: {
         type: String,
         required: [true, "Project name is required"],
      },
      organisationName: {
         type: String,
         required: [true, "Organisation name is required"],
      },
      apikey: {
         type: String,
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
