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

const editProfile = async (req, res) => {
  try {
    const { firstname, middlename, lastname, gender, occupation, dateOfBirth, phonenumber } = req.body;
    const updatedFields = {};

    if (firstname) {
      updatedFields.firstname = firstname;
    }
    if (middlename) {
      updatedFields.middlename = middlename;
    }
    if (lastname) {
      updatedFields.lastname = lastname;
    }
    if (gender) {
      updatedFields.gender = gender;
    }
    if (occupation) {
      updatedFields.occupation = occupation;
    }
    if (phonenumber) {
      updatedFields.phoneNumber = phonenumber;
    }
    if (dateOfBirth) {
      updatedFields.dateOfBirth = dateOfBirth;
    }

    const userId = req.user.id;
    const updatedUser = await userService.update(userId, updatedFields);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message
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

    let userCopy = JSON.parse(JSON.stringify(req.user));
    userCopy.photos = userCopy.photos.concat(photos);

    userService.update(req.user.id, userCopy);

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

    let userCopy = JSON.parse(JSON.stringify(req.user));
    userCopy.files = userCopy.files.concat(documents);

    userService.update(req.user.id, userCopy);
    
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