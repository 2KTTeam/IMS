const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const asyncHandler = require("express-async-handler");

router.post("/user-verification", asyncHandler(handler.public.verifyUser));
router.post("/user-confirmation", asyncHandler(handler.public.confirmUser));

module.exports = router;
