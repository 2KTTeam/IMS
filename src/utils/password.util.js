const argon2 = require('argon2');

const hashPassword = async function (password) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
}

const verifyPassword = async function (hash, password) {
  try {
    return await argon2.verify(hash, password);
  } catch (error) {
    throw new Error(`Error verifying password: ${error.message}`);
  }
}


module.exports = {
  hashPassword,
  verifyPassword
}