const { StatusCodes } = require("http-status-codes");
const { auth } = require("../services");

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, role, password, gender, dateOfBirth, phoneNumber, address } = req.body;

    const userRoute = req.route.path;
    if (userRoute == '/register/admin'){
      console.log('manager is regisering an admin account');
      if (req.user.role !== 'manager'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: `you must be a manager`
        });
      } 
    } else if (userRoute == '/register/user') {
      console.log('admin is regisering a user account');
      if (req.user.role !== 'admin'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: `you must be an admin`
        });
      } 
    }

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
  register,
  login,
};