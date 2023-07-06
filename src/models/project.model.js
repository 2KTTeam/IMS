const mongoose = require("mongoose");
const DbService = require("./data.service");

const projectSchema = new mongoose.Schema(
   {
      projectName: {
         type: String,
         required: [true, "Project name is required"],
      },
      projectOwner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: [true, "Project owner is required"],
      },
      APIKey: {
         type: String,
      },
      projectId: {
         type: String,
         required: [true, "Project id is required"],
      },
      organisationName: {
         type: String,
         required: [true, "Organisation name is required"],
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
