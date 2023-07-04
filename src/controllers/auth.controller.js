const { StatusCodes } = require("http-status-codes");
const { auth } = require("../services");
const {sendWelcomeEmail} = require('../email');


const registerManager = async (req, res) => {
  try {
    const { firstname, lastname, email, role, password, gender, dateOfBirth, phoneNumber, address } = req.body;

    const newUser = {
      firstname, lastname, email, role, password, gender, dateOfBirth, phoneNumber, address
    }

    const user = await auth.register(newUser);

    // Return the saved User object
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      user
    });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Error creating User: ${error.message}`
    });
  }
};


const registerAdmin = async (req, res) => {
  try {
    const { firstname, lastname, email, password, gender, dateOfBirth, phoneNumber, address } = req.body;

    const newUser = {
      firstname, lastname, email, role: 'admin', password, gender, dateOfBirth, phoneNumber, address
    }

    const user = await auth.register(newUser);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Admin not registered!'
      });
    }
    
    sendWelcomeEmail(email, firstname, lastname,email, password)

    // Return the saved User object
    return res.status(StatusCodes.CREATED).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Error creating Admin: ${error.message}`
    });
  }
}

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, gender, dateOfBirth, phoneNumber, address } = req.body;

    const newUser = {
      firstname, lastname, email, role: 'user', password, gender, dateOfBirth, phoneNumber, address
    }

    const user = await auth.register(newUser);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Admin not registered!'
      });
    }

    // Return the saved User object
    return res.status(StatusCodes.CREATED).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: `Error creating Admin: ${error.message}`
    });
  }
}

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



module.exports = {
  registerManager,
  registerAdmin,
  registerUser,
  login,
};