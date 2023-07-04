const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
// const { protect } = require("../../utils").jwt;
const asyncHandler = require("express-async-handler");
// const { register } = require("../../validators");

router.post('/verify', asyncHandler(handler.verify.verifyUserId));
router.post('/confirm', asyncHandler(handler.verify.accessProfile));


module.exports = router;          