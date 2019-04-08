import joi from 'joi';

const userSchema = joi.object().keys({
  id: joi.number().required(),
  firstName: joi.string().alphanum().min(3).required(),
  lastName: joi.string().alphanum().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  type: joi.string().min(4).required(),
  isAdmin: joi.boolean().required(),
});

export default userSchema;
