const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const asyncHandler = require("express-async-handler");
const { validateProject } = require("../../validators");

router.post("/", validateProject, asyncHandler(handler.project.newProject));
router.post("/verifyUser", asyncHandler(handler.project.verifyUser));
router.post("/confirmUser", asyncHandler(handler.project.confirmUser));

module.exports = router;
