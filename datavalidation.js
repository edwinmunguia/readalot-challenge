const Joi = require("@hapi/joi");

const validateLoginData = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.pattern(/^[\S]{3,30}$/),
  });

  return schema.validate(data);
};

const validateRegisterData = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.pattern(/^[\S]{6,30}$/),
    repeatPassword: Joi.ref("password"),
    username: Joi.string().alphanum().min(3).max(15).required(),
  });

  return schema.validate(data);
};

const validateCommentData = (data) => {
  const schema = Joi.object({
    post: Joi.number().required(),
    comment: Joi.string().min(2).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateLoginData,
  validateRegisterData,
  validateCommentData,
};
