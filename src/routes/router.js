import express from 'express';
import userControl from '../controllers/userController';

const route = express.Router();

route.post('/api/v1/auth/signup', userControl.signup);
route.post('/api/v1/auth/login', userControl.login);

export default route;
