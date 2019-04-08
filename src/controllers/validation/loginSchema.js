import joi from 'joi';

const loginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});
export default loginSchema;
