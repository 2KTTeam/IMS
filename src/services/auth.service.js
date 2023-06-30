const { passwordUtil, jwt } = require('../utils');
const { userService } = require('../models');

class AuthHelper {
  
  async login(email, password) {
    try {
      const user = await userService.queryOne({email});
      const hashPassword = await user.password;

      if (!user) {
        throw new Error('User not found');
      }

      const isPassword = await passwordUtil.verifyPassword(hashPassword, password);

      if (isPassword) {
        const token = await jwt.signToken({ user });
        console.log('token: ' + token);
        return token;
      } else {
        throw new Error('Invalid password');
      }
    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }
}

module.exports = new AuthHelper();
