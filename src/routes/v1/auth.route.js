const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const { protect, managerPrivilege, adminPrivilege } = require("../../utils").jwt;
const asyncHandler = require("express-async-handler");
const { register } = require("../../validators");
const {multer} = require("../../middlewares");

router.post("/register/manager", register, asyncHandler(handler.auth.registerManager));
router.post("/register/admin", protect, managerPrivilege, register, asyncHandler(handler.auth.registerAdmin));
router.post("/register/user", protect, adminPrivilege, register, asyncHandler(handler.auth.registerUser));


router.post('/login', asyncHandler(handler.auth.login));


module.exports = router;          