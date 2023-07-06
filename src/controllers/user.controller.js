const { StatusCodes } = require("http-status-codes");
const { userService } = require("../models");

const newUser = async (req, res) => {
   try {
   } catch (error) {}
};
const allUsers = async (req, res) => {
   try {
      const users = await userService.query();

      const data = {
         users,
      };

      return res
         .status(StatusCodes.OK)
         .json({ code: StatusCodes.OK, status: true, message: data });
   } catch (error) {
      return res.status(StatusCodes.OK).json({
         success: false,
         code: StatusCodes.INTERNAL_SERVER_ERROR,
         error: `Error testing : ${error.message}`,
      });
   }
};
const deleteUser = async (req, res) => {
   try {
   } catch (error) {}
};
module.exports = { allUsers, newUser, deleteUser };
