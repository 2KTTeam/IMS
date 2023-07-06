const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const asyncHandler = require("express-async-handler");
const { validateUser } = require("../../validators");
const { protect, adminPrivilege } = require("../../utils/jwt.util");

router.get("/", protect, adminPrivilege, asyncHandler(handler.user.allUsers));
router.get("/:userId", protect, adminPrivilege, asyncHandler(handler.user.singleUser));
router.delete("/:userId", protect, adminPrivilege, asyncHandler(handler.user.deleteUser));

module.exports = router;
