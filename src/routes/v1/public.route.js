const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const handler = require("../../controllers");
const asyncHandler = require("express-async-handler");
const { verifyAPIKey } = require("../../middlewares");

const publicRouteLimiter = rateLimit({
	windowMs: 60 * 60 * 100, // 1 min
	max: 4,
	message:
		'Too many request from this IP, please try again after a minute.',
	standardHeaders: true,
	legacyHeaders: false,
})

router.post(
   "/user-verification",
   publicRouteLimiter,
   verifyAPIKey,
   asyncHandler(handler.public.verifyUser)
);
router.post(
   "/user-confirmation",
   publicRouteLimiter,
   verifyAPIKey,
   asyncHandler(handler.public.confirmUser)
);

module.exports = router;
