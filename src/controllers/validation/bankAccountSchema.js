import joi from 'joi';

const bankAccounntSchema = joi.object().keys({
  id: joi.number().positive().required(),
  accountNumber: joi.number().positive().required(),
  createdOn: joi.date().required(),
  owner: joi.number().positive().required(),
  type: joi.string().min(4).required(),
  status: joi.string().min(4).required(),
  balance: joi.number().positive().required(),
});
export default bankAccounntSchema;
