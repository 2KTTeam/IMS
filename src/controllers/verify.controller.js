const { StatusCodes } = require("http-status-codes");
const { userService } = require("../models");
const { ProfileVerifyMail } = require("../email");
const { generateOTP } = require("../utils");

const verifyUserId = async function (req, res) {
  try {
    const { userId } = req.body;
    let availableUser = await userService.queryOne({ verification_token: userId });
    if (!availableUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Invalid verification token'
      });
    }

    const recipient = availableUser ? availableUser.email: null;
    const firstname = availableUser ? availableUser.firstname: null;
    const lastname = availableUser ? availableUser.lastname: null;
    const UserToken = await generateOTP();

    availableUser.OTP = UserToken;
    
    const tokenizedUser = await userService.update(availableUser.id,availableUser);

    if (recipient && firstname && lastname && UserToken){
      ProfileVerifyMail(recipient, firstname, lastname, UserToken);
    } else {
     throw new Error('ensure your: email, firstname, lastname and usertoken are valid');
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `One-Time-Pin(OTP) sent successfully, user with tokenID: ${userId} should authorize this action.`
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Verification Error: ${error.message}`,
    });
  }
};

const accessProfile = async function (req, res) {
  try {
    const { OTP } = req.body;
    const {TokenId} = req.params;
    const availableUser = await userService.queryOne({ verification_token: TokenId, OTP:OTP });

    let copy = JSON.parse(JSON.stringify(availableUser));
    
    delete copy.password;
    delete copy.verification_token;
    delete copy.OTP;
    delete copy.__v;
    delete copy._id;
    delete copy.createdAt;
    delete copy.updatedAt;

    return res.status(StatusCodes.OK).json({
      success: true,
      user: copy
    });



   
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Confirmation Error: ${error.message}`,
    });
  }
};

module.exports = {
  verifyUserId,
  accessProfile,
}