const Joi = require("@hapi/joi");

const validateLoginData = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[S]{3,30}$")),
  });

  return schema.valid(data);
};

const validateRegisterData = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[S]{3,30}$")),
    repeatPassword: Joi.ref("password"),
  });

  return schema.valid(data);
};

module.exports = { validateLoginData, validateRegisterData };
