const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const asyncHandler = require("express-async-handler");
const { validateProject } = require("../../validators");
const { protect, managerPrivilege } = require("../../utils").jwt;

router.post("/", protect, validateProject, asyncHandler(handler.user.newUser));
router.get("/", protect, managerPrivilege, asyncHandler(handler.user.allUsers));
router.get("/:userId", protect, managerPrivilege, asyncHandler(handler.user.sinlgeUser));
router.delete("/", protect, managerPrivilege, asyncHandler(handler.user.deleteUser));

module.exports = router;
