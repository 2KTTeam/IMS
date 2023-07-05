const { StatusCodes } = require("http-status-codes");
const { userService } = require("../models");


const getProfile = async function (req, res) {
  try {
    const user = req.user;
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'User profile was successfully retrieved',
      user: user
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Error Fetching Profile: ${error.message}`
    });
  }
}

const deleteProfile = async function (req, res) {
  try {
    const user = req.user;
    const deletedUser = await userService.delete(user.id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `User Profile deleted successfully`,
      user: deletedUser
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Error Deleting Profile: ${error.message}`
    });
  }
}



const uploadImage = async function (req, res) {
  try {

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Error Uploading Image: ${error.message}`
    });
  }
}

const uploadFile = async function (req, res) {
  try {

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Error Uploading File: ${error.message}`
    });
  }
}

module.exports = {
  getProfile,
  deleteProfile
  uploadImage,
  uploadFile
};