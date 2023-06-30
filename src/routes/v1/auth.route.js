const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const { protect } = require("../../utils").jwt;
const asyncHandler = require("express-async-handler");
const { register } = require("../../validators");

router.post("/register", register, asyncHandler(handler.auth.register));
router.post("/login", asyncHandler(handler.auth.login));
router.get("/test", asyncHandler(handler.auth.tested));

module.exports = router;          