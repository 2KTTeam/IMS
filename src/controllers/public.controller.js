const { StatusCodes } = require("http-status-codes");
const { ProfileVerifyMail } = require("../email");
const { generateOTP } = require("../utils");
const { userService } = require("../models");

const verifyUser = async function (req, res) {
   try {
      const { userId } = req.body;
      let availableUser = await userService.queryOne({ IMSCode: userId });
      if (!availableUser) {
         return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Invalid verification token",
         });
      }

      const recipient = availableUser ? availableUser.email : null;
      const firstname = availableUser ? availableUser.firstname : null;
      const lastname = availableUser ? availableUser.lastname : null;
      const UserToken = await generateOTP();

      availableUser.OTP = UserToken;
      availableUser.otpExpirationTime = Date.now() + 300000;
      availableUser.otpStatus = 1;

      const tokenizedUser = await userService.update(availableUser.id, availableUser);

      if (recipient && firstname && lastname && UserToken) {
         ProfileVerifyMail(recipient, firstname, lastname, UserToken);
      } else {
         throw new Error(
            "ensure your: email, firstname, lastname and usertoken are valid"
         );
      }
      return res.status(StatusCodes.OK).json({
         success: true,
         message: `One-Time-Pin(OTP) sent successfully, user with tokenID: ${userId} should authorize this action.`,
      });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         success: false,
         error: `Verification Error: ${error.message}`,
      });
   }
};

const confirmUser = async function (req, res) {
   try {
      const { OTP, IMSCode } = req.body;
      const availableUser = await userService.queryOne({
         IMSCode: IMSCode,
         OTP: OTP,
      });

      //check if otp has been used
      if(availableUser.otpStatus == 0)return res.status(StatusCodes.OK).json({message: 'otp has been used by you', status: false});

      //check if otp has expired
      if(Date.now() > availableUser.otpExpirationTime  ) return res.status(StatusCodes.OK).json({message: 'token has expired', status: false});

      //remove token from user document
      await userService.update(availableUser._id, {otpStatus: 0});

      let copy = JSON.parse(JSON.stringify(availableUser));

      delete copy.password;
      delete copy.verification_token;
      delete copy.OTP;
      delete copy.__v;
      delete copy._id;
      delete copy.createdAt;
      delete copy.updatedAt;
      delete copy.otpExpirationTime;

      return res.status(StatusCodes.OK).json({
         success: true,
         user: copy,
      });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         success: false,
         error: `Confirmation Error: ${error.message}`,
      });
   }
};

module.exports = {
   verifyUser,
   confirmUser,
};
