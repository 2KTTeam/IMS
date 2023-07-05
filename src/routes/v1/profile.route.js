const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const { protect, userPrivilege } = require("../../utils").jwt;
const asyncHandler = require("express-async-handler");
const { multer } = require("../../middlewares");

router.get("/", protect, userPrivilege, asyncHandler(handler.profile.getProfile));
router.put("/", protect, userPrivilege, asyncHandler(handler.profile.editProfile));
router.delete("/", protect, userPrivilege, asyncHandler(handler.profile.deleteProfile));

router.put("/images", multer, protect, userPrivilege, asyncHandler(handler.profile.uploadImage));
router.put('/pdfs', multer, protect, userPrivilege, asyncHandler(handler.profile.uploadFile));


module.exports = router;          