const { StatusCodes } = require("http-status-codes");
const { auth } = require("../services");
const { uuidUtil, passwordUtil } = require("../utils");
const { User, userService } = require("../models");

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, gender, dateOfBirth, phoneNumber, address } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await userService.queryOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'User with the provided email already exists.'
      });
    }
    
    // Hash the password using the passwordUtil
    const hashedPassword = await passwordUtil.hashPassword(password); 

    const newUser = new User({
      userId: await uuidUtil.giveID(),
      firstname,
      lastname,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
      phoneNumber,
      address
    });
    console.log({newUser})
    const savedUser = await newUser.save();
    console.log({savedUser})

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      newUser: savedUser
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Error creating User: ${error.message}`
    });
  }
};

const login = async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const token = await auth.login(email, password);


    return res.status(StatusCodes.OK).json({
      status: "success",
      token
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Error signing in: ${error.message}`,
    });
  }
};

const tested = async function (req, res) {
  console.log("tested function called");
  try {
    const newUser = await userService.queryOne({email:'johndoe@example.com'})
    return res.status(StatusCodes.OK).json({
      newUser,
      status: "success",
      message: "Test successfully"
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Error testing : ${error.message}`,
    });
  }
};


module.exports = {
  register,
  login,
  tested
};