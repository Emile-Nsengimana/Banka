/* eslint-disable no-shadow */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModal from '../modals/user';
import schema from './validation/userSchema';
import loginSchema from './validation/loginSchema';


dotenv.config();
class userController {
  // ================================================== SIGNUP =====================================
  static signup(req, res) {
    const {
      firstName, lastName, email, password, type, isAdmin,
    } = req.body;

    const idNo = userModal.length + 1;
    const jwtoken = jwt.sign({ id: idNo }, process.env.NEVERMIND, { expiresIn: '24h' });

    const newUser = schema.validate({
      id: idNo, firstName, lastName, email, password, type, isAdmin,
    });
    if (!newUser.error) {
      userModal.push(newUser);
      const {
        id, firstName, lastName, email, type, isAdmin,
      } = newUser.value;
      return res.status(201).json({
        status: 201,
        data: {
          token: jwtoken, id, firstName, lastName, email, type, isAdmin,
        },
      });
    }
    return res.status(400).json({
      status: 400,
      error: newUser.error.details[0].message.replace('"', ' ').replace('"', ''),
    });
  }

  // ================================================== LOGIN =====================================
  static login(req, res) {
    const { email, password } = req.body;
    const credentials = loginSchema.validate({
      email, password,
    });
    if (!credentials.error) {
      const user = userModal.find(usr => usr.email === email);
      if (user) {
        if (user.password === password) {
          const jwtoken = jwt.sign({ id: user.id }, process.env.NEVERMIND, { expiresIn: '24h' });
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
        return res.status(401).json({
          status: 401,
          message: 'incorrect password',
        });
      }
      return res.status(404).json({
        status: 404,
        message: 'email not found',
      });
    }
    return res.status(400).json({
      status: 400,
      error: credentials.error.details[0].message.replace('"', ' ').replace('"', ''),
    });
  }
}
export default userController;