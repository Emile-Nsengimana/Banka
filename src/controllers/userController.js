import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModal from '../modals/user';

dotenv.config();
class userController {
  static signup(req, res) {
    const {
      firstName, lastName, email, password, type, isAdmin,
    } = req.body;
    const idNo = userModal.length + 1;
    const jwtoken = jwt.sign({ id: idNo }, process.env.NEVERMIND, { expiresIn: '24h' });

    const newUser = {
      id: idNo,
      firstName,
      lastName,
      email,
      password,
      type,
      isAdmin,
    };
    userModal.push(newUser);
    res.status(201).json({
      status: 201,
      data: {
        token: jwtoken,
        id: idNo,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        type: newUser.type,
        isAdmin: newUser.isAdmin,
      },
    });
  }
}
export default userController;
