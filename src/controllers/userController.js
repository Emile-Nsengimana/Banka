/* eslint-disable max-len */
/* eslint-disable no-shadow */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { stringify } from 'querystring';
import userModal from '../modals/user';
import schema from './validation/userSchema';
import loginSchema from './validation/loginSchema';
import msg from '../helpers/message';

dotenv.config();
class userController {
  static welcome(req, res) {
    return res.send(msg);
  }

  // ================================================== SIGNUP =====================================
  static signup(req, res) {
    const {
      firstName, lastName, email, password, retype, type,
    } = req.body;
    const findUser = userModal.find(client => client.email === email.toLowerCase());
    if (findUser) {
      return res.status(400).json({ status: 400, error: 'user with the same email already exist' });
    }
    if (password !== retype) {
      return res.status(400).json({ status: 400, error: 'password doesn\'t match' });
    }
    const idNo = userModal.length + 1;
    const jwtoken = jwt.sign({ id: idNo }, process.env.NEVERMIND);
    const isAdmin = false;
    const newUser = schema.validate({
      id: idNo, firstName, lastName, email: email.toLowerCase(), password, type: type.toLowerCase(), isAdmin,
    });
    if (!newUser.error) {
      userModal.push(newUser.value);
      return res.status(201).json({
        status: 201,
        data: {
          token: jwtoken, idNo, firstName, lastName, email: email.toLowerCase(), type: type.toLowerCase(), isAdmin,
        },
      });
    }
    const validationError = newUser.error.details[0].message.replace('"', ' ').replace('"', '');
    if (validationError === ' password must meet password complexity requirements') {
      return res.status(400).json({ status: 400, error: 'password length must be 8 with atleast an upper, lower case letter, and a number,' });
    }
    return res.status(400).json({ status: 400, error: validationError });
  }

  // ================================================== LOGIN =====================================
  static login(req, res) {
    const { email, password } = req.body;
    const credentials = loginSchema.validate({
      email, password,
    });
    if (!credentials.error) {
      const user = userModal.find(usr => usr.email === email.toLowerCase());
      if (user) {
        if (user.password === password) {
          const jwtoken = jwt.sign({ id: user.id }, process.env.NEVERMIND);
          const {
            id, firstName, lastName, email,
          } = user;
          return res.status(200).json({
            status: 200,
            data: {
              token: jwtoken, id, firstName, lastName, email,
            },
          });
        }
        return res.status(401).json({ status: 401, message: 'incorrect password' });
      }
      return res.status(404).json({ status: 404, message: 'email not found' });
    }
    return res.status(400).json({ status: 400, error: credentials.error.details[0].message.replace('"', ' ').replace('"', '') });
  }
}
export default userController;
