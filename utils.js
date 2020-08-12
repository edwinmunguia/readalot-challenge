const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

//Helper function to compare passwords
const passwordsAreEqual = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

//Helper function to create error messsages
const generateError = (message = "") => ({ error: message });

//Helper function to generate a token
const generateToken = (data, secret) => jwt.sign(data, secret);

module.exports = { hashPassword, generateError, passwordsAreEqual, generateToken};
