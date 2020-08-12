const bcrypt = require("bcryptjs");

//Helper function to hash passwords
const bcryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

//Helper function to create error messsages
const generateError = (message) => ({
  error: message,
});

module.exports = bcryptPassword;
module.exports = generateError;
