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

const editProfile = async function (req, res) {
  const changedInstances = [];
  try {
    const { firstname, middlename, lastname,gender, occupation, dateOfBirth} = req.body;

    if (firstname) {
      changedInstances.push(firstname);
    }
    if (lastname) {
      changedInstances.push(lastname);
    }
    if (middlename) {
      changedInstances.push(middlename);

    }
    if (gender) {
      changedInstances.push(gender);

    }
    if (occupation) {
      changedInstances.push(occupation);

    }
    if (dateOfBirth) {
      changedInstances.push(dateOfBirth);
    }

    const updatedProfile = profileService.update(changedInstances);
     
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "",
      user: updatedProfile
    });
  }
  catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};



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
  deleteProfile,
  editProfile,
  uploadImage,
  uploadFile
};