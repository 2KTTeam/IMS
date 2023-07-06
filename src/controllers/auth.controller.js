const { StatusCodes } = require("http-status-codes");
const { auth } = require("../services");
const { sendWelcomeEmail, welcomeUser } = require("../email");
const { managerData } = require("../configs");
const { userService } = require("../models");

const registerManager = async (managerData) => {
   try {
      const {
         firstname,
         lastname,
         email,
         role,
         password,
         gender,
         dateOfBirth,
         phoneNumber,
         address,
      } = managerData;

      const newUser = {
         firstname,
         lastname,
         email,
         role,
         password,
         gender,
         dateOfBirth,
         phoneNumber,
         address,
      };

      await auth.register(newUser);
      console.log("Manager Successfully Seeded into Database");
   } catch (error) {
      console.log("a manager now exists in the database");
   }
};

registerManager(managerData);

const registerAdmin = async (req, res) => {
   try {
      const {
         firstname,
         lastname,
         email,
         password,
         gender,
         dateOfBirth,
         phoneNumber,
         address,
      } = req.body;

      const currentUser = await userService.queryOne({ email });

      if (currentUser)
         return res
            .status(StatusCodes.CREATED)
            .json({ message: "User with email already exists", status: false });

      const newUser = {
         firstname,
         lastname,
         email,
         role: "admin",
         password,
         gender,
         dateOfBirth,
         phoneNumber,
         address,
      };

      const user = await auth.register(newUser);
      if (!user) {
         return res.status(400).json({
            success: false,
            message: "Admin not registered!",
         });
      }
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         success: false,
         error: `Error creating Admin: ${error.message}`,
      });
   }
};

const registerUser = async (req, res) => {
   try {
      const {
         firstname,
         lastname,
         email,
         password,
         gender,
         dateOfBirth,
         phoneNumber,
         address,
      } = req.body;

      const currentUser = await userService.queryOne({ email });

      if (currentUser)
         return res
            .status(StatusCodes.CREATED)
            .json({ message: "User with email already exists", status: false });

      const newUser = {
         firstname,
         lastname,
         email,
         role: "user",
         password,
         gender,
         dateOfBirth,
         phoneNumber,
         address,
      };

      const user = await auth.register(newUser);
      if (!user) {
         return res.status(400).json({
            success: false,
            message: "Admin not registered!",
         });
      }

      welcomeUser(email, firstname, lastname, email, password, user.IMSCode);
      // Return the saved User object
      return res.status(StatusCodes.CREATED).json({
         success: true,
         user,
      });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         success: false,
         error: `Error creating Admin: ${error.message}`,
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
         token,
      });
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
