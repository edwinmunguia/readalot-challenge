const Joi = require("@hapi/joi");

const validateLoginData = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9._]{3,30}$")),
  });

  return schema.validate(data);
};

const validateRegisterData = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9._]{6,30}$")),
    repeatPassword: Joi.ref("password"),
    username: Joi.string().alphanum().min(3).max(15).required(),
  });

  return schema.validate(data);
};

const validatePostData = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(40).required(),
    content: Joi.string().min(240).required(),
  });

  return schema.validate(data);
};

const validateCommentData = (data) => {
  const schema = Joi.object({
    comment: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateLoginData,
  validateRegisterData,
  validatePostData,
  validateCommentData,
};
