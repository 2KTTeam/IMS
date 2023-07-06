const express = require("express");
const router = express.Router();
const handler = require("../../controllers");
const { protect, managerPrivilege, adminPrivilege } = require("../../utils").jwt;
const asyncHandler = require("express-async-handler");
const { validateUser } = require("../../validators");
const { multer } = require("../../middlewares");

router.post(
   "/register/admin",
   protect,
   managerPrivilege,
   validateUser,
   asyncHandler(handler.auth.registerAdmin)
);
router.post(
   "/register/user",
   protect,
   adminPrivilege,
   validateUser,
   asyncHandler(handler.auth.registerUser)
);

router.post("/login", asyncHandler(handler.auth.login));

module.exports = router;
