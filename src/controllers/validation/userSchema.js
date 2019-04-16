import joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 2,
};
const userSchema = joi.object().keys({
  id: joi.number().required(),
  firstName: joi.string().alphanum().min(3).required(),
  lastName: joi.string().alphanum().min(3).required(),
  email: joi.string().email().required(),
  password: new PasswordComplexity(complexityOptions),
  type: joi.string().min(4).required(),
  isAdmin: joi.boolean().required(),
});

export default userSchema;
