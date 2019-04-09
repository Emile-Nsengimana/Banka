import express from 'express';
import auth from '../authentication/auth';
import userControl from '../controllers/userController';
import accountControl from '../controllers/accountController';
import transactionControl from '../controllers/transactionController';

const route = express.Router();

route.post('/api/v1/auth/signup', userControl.signup);
route.post('/api/v1/auth/login', userControl.login);
route.post('/api/v1/accounts', auth, accountControl.createAccount);
route.patch('/api/v1/account/:id', auth, accountControl.changeAccountStatus);
<<<<<<< HEAD
route.delete('/api/v1/account/:id', auth, accountControl.deleteAccount);
=======
route.post('/api/v1/transactions/:accountNo/debit', auth, transactionControl.debitAccount);
>>>>>>> challenge-ii

export default route;
