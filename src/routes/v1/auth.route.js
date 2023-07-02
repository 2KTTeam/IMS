const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const { protect, managerPrivilege, adminPrivilege } = require("../../utils").jwt;
const asyncHandler = require("express-async-handler");
const { register } = require("../../validators");

router.post("/register/manager", register, asyncHandler(handler.auth.register));
router.post("/register/admin", protect, managerPrivilege, register, asyncHandler(handler.auth.register));
router.post("/register/user", protect, adminPrivilege, register, asyncHandler(handler.auth.register));

router.post("/login", asyncHandler(handler.auth.login));

module.exports = router;          