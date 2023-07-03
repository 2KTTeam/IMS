const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
// const { protect, managerPrivilege, adminPrivilege } = require("../../utils").jwt;
const asyncHandler = require("express-async-handler");
const {multer} = require("../../middlewares");

router.post("/image/upload", multer, asyncHandler(handler.profile.uploadImage));
router.post('/file/upload', multer, asyncHandler(handler.profile.uploadFile));

module.exports = router;          