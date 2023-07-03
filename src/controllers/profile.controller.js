const { StatusCodes } = require("http-status-codes");

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
  uploadImage,
  uploadFile
};