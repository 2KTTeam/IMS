const { StatusCodes } = require("http-status-codes");
const { userService } = require("../models");
const { uploadMedia } = require("../services");


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
    const files = [...(req.files.images || [])];
    console.log("files", files);
    const media = await Promise.all(files.map((file) => uploadMedia(file)));
    const Uploadedphotos = media.filter((file) => file.resource_type === "image");

    const photos = Uploadedphotos.map((photo) => ({
      public_id: photo.public_id,
      url: photo.secure_url,
    }));

    return res.status(StatusCodes.OK).json({
      photos,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}

const uploadFile = async function (req, res) {
  try {
    const files = [...(req.files.pdfs || [])];
    console.log("files", files);
    const media = await Promise.all(files.map((file) => uploadMedia(file)));

    const UploadedDocuments = media.filter(
      (file) => file.format === "pdf"
    );

    const documents = UploadedDocuments.map((document) => ({
      public_id: document.public_id,
      url: document.secure_url,
    }));

    return res.status(StatusCodes.OK).json({
      documents,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
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