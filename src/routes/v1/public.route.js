const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const asyncHandler = require("express-async-handler");
const { verifyApikey} = require('../../middlewares');

router.post("/user-verification", verifyApikey, asyncHandler(handler.public.verifyUser));
router.post("/user-confirmation", verifyApikey, asyncHandler(handler.public.confirmUser));

module.exports = router;
