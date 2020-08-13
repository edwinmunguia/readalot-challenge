const jwt = require("jsonwebtoken");
const { generateError } = require("../utils");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  if (!token) res.json(generateError("Access Denied"));

  try {
    const verified = jwt.verify(token, "acklenavenue");
    req.user = verified;
    next();
  } catch (e) {
    res.json(generateError("Invalid Token"));
  }
};
