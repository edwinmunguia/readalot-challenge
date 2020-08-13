const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const urlSlug = require("url-slug");
const removeMd = require("remove-markdown");

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

//Helper function to generate url slug
const generateSlug = (text) => urlSlug(text);

//Helper function to extract summary
const extractSummary = (text, length) => removeMd(text).substring(0, length);

module.exports = {
  hashPassword,
  generateError,
  passwordsAreEqual,
  generateToken,
  generateSlug,
  extractSummary,
};
