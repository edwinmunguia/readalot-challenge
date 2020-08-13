const jwt = require("jsonwebtoken");
const { generateError } = require("../utils");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  if (!token) return res.json(generateError("You need an access token to make requests"));

  try {
    const verified = jwt.verify(token, "acklenavenue");
    req.user = verified;
    next();
  } catch (e) {
    res.json(generateError("Invalid Token"));
  }
};
