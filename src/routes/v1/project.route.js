const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const asyncHandler = require("express-async-handler");
const { validateProject } = require("../../validators");
const { protect, userPrivilege } = require("../../utils").jwt;

router.post("/", protect, validateProject, asyncHandler(handler.project.newProject));
router.get("/", protect, userPrivilege, asyncHandler(handler.project.allProjects));
router.delete("/:projectId", protect, userPrivilege, asyncHandler(handler.project.deleteProject));

module.exports = router;
