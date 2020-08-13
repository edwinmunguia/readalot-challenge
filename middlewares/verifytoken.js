const jwt = require("jsonwebtoken");
const utils = require("../utils");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  if (!token) return res.json(utils.generateError("You need an access token to make requests"));

  try {
    const verified = jwt.verify(token, "acklenavenue");
    req.user = verified;
    next();
  } catch (e) {
    return res.json(utils.generateError("Invalid Token"));
  }
};
