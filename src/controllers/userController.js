/* eslint-disable no-shadow */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModal from '../modals/user';
import schema from './validation/userSchema';

dotenv.config();
class userController {
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
      res.status(201).json({
        status: 201,
        data: {
          token: jwtoken,
          id,
          firstName,
          lastName,
          email,
          type,
          isAdmin,
        },
      });
    } else {
      res.status(400).json({
        status: 400,
        error: newUser.error.details[0].message.replace('"', ' ').replace('"', ''),
      });
    }
  }
}
export default userController;
