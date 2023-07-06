const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const { protect } = require("../../utils").jwt;
const asyncHandler = require("express-async-handler");
const { multer } = require("../../middlewares");

router.get("/", protect, asyncHandler(handler.profile.getProfile));
router.put("/", protect, asyncHandler(handler.profile.editProfile));
router.delete("/", protect, asyncHandler(handler.profile.deleteProfile));

router.put("/images", protect, multer, asyncHandler(handler.profile.uploadImage));
router.put("/pdfs", protect, multer, asyncHandler(handler.profile.uploadFile));

module.exports = router;
