require('dotenv').config();
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
const { ENV } = require('../configs');
const { User } = require('../models');
const secret = ENV.jwt;


function signToken(payload) {
  console.log("inside the sign token")
  try {
    return jwt.sign(payload, secret);
  } catch (error) {
    throw new Error("error signing token: " + error.message);
  }
};

function decodeToken(token) {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  } catch (error) {
    throw new Error("error decoding token: " + error.message);
  }
};

async function protect(req, res, next) {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token || token == null) {
      return res.status(400).json({ message: "No Token Provided!" });
    }
    // decode the token
    const decoded = decodeToken(token);

    // check if the user exists
    const user = await User.findById(decoded.user._id);
    if (!user) {
      return res.status(401).json({
        error: "User Not Found",
      });
    }
    console.log(user.firstname + " is successfully authenticated");
    // add the user to the request
    req.user = user;
    // call the next middleware
    next();
  } catch (error) {
    return res.status(401).json({
      status: "authentication error",
      msg: "sign in to continue",
    });
  }
};

async function managerPrivilege(req, res, next) {
  try {
    if (req.user.role !== "manager") {
      throw new Error("user is not a manager");
    }

    next();
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Permission denied ${error.message}`,
    });
  }
}


async function adminPrivilege(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      throw new Error("user is not an admin");
    }

    next();
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Permission denied ${error.message}`,
    });
  }
}

module.exports = {
  signToken,
  decodeToken,
  protect,
  managerPrivilege,
  adminPrivilege,
};