import express from 'express';
import auth from '../authentication/auth';
import userControl from '../controllers/userController';
import accountControl from '../controllers/accountController';

const route = express.Router();

route.post('/api/v1/auth/signup', userControl.signup);
route.post('/api/v1/auth/login', userControl.login);
route.post('/api/v1/accounts', auth, accountControl.createAccount);


export default route;
