const { uuidUtil, passwordUtil, jwt, generateMemorableId } = require("../utils");
const { userService, User } = require("../models");

class AuthHelper {
   async register(Props) {
      try {
         // Check if a user with the same email already exists
         const existingUser = await userService.queryOne({
            email: Props.email,
            role: Props.role,
         });
         if (existingUser) {
            throw new Error("User with the provided email already exists.");
         }

         // Hash the password using the passwordUtil
         const hashedPassword = await passwordUtil.hashPassword(Props.password);

         // Create a new User object
         const newUser = new User({
            userId: await uuidUtil.giveID(),
            firstname: Props.firstname,
            lastname: Props.lastname,
            IMSCode: generateMemorableId(),
            email: Props.email,
            role: Props.role,
            password: hashedPassword,
            gender: Props.gender,
            dateOfBirth: Props.dateOfBirth,
            phoneNumber: Props.phoneNumber,
            address: Props.address,
         });

         // Save the new User object
         const savedUser = await newUser.save();
         return savedUser;
      } catch (error) {
         throw new Error(`Registration error: ${error.message}`);
      }
   }

   async login(email, password) {
      try {
         const user = await userService.queryOne({ email });

         if (!user) {
            throw new Error("User not found");
         }

         const hashPassword = await user.password;

         const isPassword = await passwordUtil.verifyPassword(hashPassword, password);

         if (isPassword) {
            const token = await jwt.signToken({ user });
            return token;
         } else {
            throw new Error("Invalid password");
         }
      } catch (error) {
         throw new Error(`Error logging in: ${error.message}`);
      }
   }
}

module.exports = new AuthHelper();
