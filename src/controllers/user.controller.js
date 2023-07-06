const { StatusCodes } = require("http-status-codes");
const { userService, User } = require("../models");

const allUsers = async (req, res) => {
   try {
      const users = await userService.query();

      const data = {
         users,
      };

      return res.status(StatusCodes.OK).json({ status: true, message: data });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         success: false,
         error: `Error testing : ${error.message}`,
      });
   }
};

const singleUser = async (req, res) => {
   try {
      const { userId } = req.params;

      const user = await userService.queryOne({ userId });
      const data = {
         user,
      };
      return res.status(StatusCodes.OK).json({
         success: true,
         data: data,
      });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         success: false,
         error: `Error testing : ${error.message}`,
      });
   }
};
const deleteUser = async (req, res) => {
   try {
      const { userId } = req.params;

      const user = await User.findOneAndDelete({ userId: userId });
      const data = {
         user,
      };
      return res.status(StatusCodes.OK).json({
         success: true,
         message: "User Deleted Successfully",
         data,
      });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         success: false,
         error: `Error testing : ${error.message}`,
      });
   }
};
module.exports = { allUsers, singleUser, deleteUser };
