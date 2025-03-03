const Joi = require("joi");

const userValidation = (data) => {
  const UserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).max(50).required(),
  });
  return UserSchema.validate(data);
};

module.exports = {
  userValidation,
};
