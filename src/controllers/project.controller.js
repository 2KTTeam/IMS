const { StatusCodes } = require("http-status-codes");
const { userService } = require("../models");
const { ProfileVerifyMail } = require("../email");
const { uuidUtil, organisationwWelcomeEmail, generateOTP } = require("../utils");
const { sendMail } = require("../services");

const newProject = async (req, res) => {
   try {
      const { email, application_server_ip, project_name, organisation_name } = req.body;

      // const client_ip = req.headers['x-real-ip'] || req.socket.remoteAddress;

      const client_ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      console.log("IP ADDRESS", client_ip);

      //Generate apikey
      const uniqueId = await uuidUtil.giveID();

      const apikey = uniqueId.toLowerCase();

      console.log(apikey);

      //create project
      await Organisation.create({
         application_server_ip,
         project_name,
         apikey,
         organisation_name,
      });

      //send email
      const emailType = "admin";
      const message = organisationwWelcomeEmail(institution_name, apikey);

      await sendMail(emailType, email, "IMS Apikey", message);

      //return response
      const data = {
         email,
         institution_name,
         software_name,
      };

      return res
         .status(StatusCodes.OK)
         .json({ code: StatusCodes.CREATED, status: true, message: data });
   } catch (error) {
      return res.status(StatusCodes.OK).json({
         success: false,
         code: StatusCodes.INTERNAL_SERVER_ERROR,
         error: `Error testing : ${error.message}`,
      });
   }
};

const verifyUser = async function (req, res) {
   try {
      const { userId } = req.body;
      let availableUser = await userService.queryOne({ verification_token: userId });
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
      const { OTP } = req.body;
      const { TokenId } = req.params;
      const availableUser = await userService.queryOne({
         verification_token: TokenId,
         OTP: OTP,
      });

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
   newProject,
   verifyUser,
   confirmUser,
};
