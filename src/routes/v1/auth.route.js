const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const { protect } = require("../../utils").jwt;
const asyncHandler = require("express-async-handler");
const { register } = require("../../validators");

router.get("/test", asyncHandler(handler.auth.tested));
router.post("/register", register, asyncHandler(handler.auth.register));
router.post("/login", asyncHandler(handler.auth.login));

module.exports = router;          