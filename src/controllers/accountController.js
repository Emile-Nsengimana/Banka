/* eslint-disable max-len */
import moment from 'moment';
import uuid from 'uuid/v1';
import bankAccount from '../modals/bankAccounts';
import userModal from '../modals/user';
import schema from './validation/bankAccountSchema';
import search from '../helpers/search';
import schemaStatus from './validation/accountStatusSchema';

class accountController {
  // ======================================== BANK ACCOUNTS ====================================
  static createAccount(req, res) {
    const { type } = req.body;
    const { id } = req.user;
    const accountOwner = userModal.find(usr => usr.id === id);
    const balance = 0;
    const newAccount = schema.validate({
      id: bankAccount.length + 1,
      accountNumber: uuid(),
      createdOn: moment.utc().format(),
      owner: id,
      type,
      status: 'active',
      balance,
    });
    if (!newAccount.error) {
      bankAccount.push(newAccount.value);
      return res.status(201).json({
        status: 201,
        data: {
          accountNumber: newAccount.value.accountNumber,
          firstName: accountOwner.firstName,
          lastName: accountOwner.lastName,
          email: accountOwner.email,
          type: accountOwner.type,
          openingBalance: balance,
        },
      });
    }
    return res.status(400).json({ status: 400, error: newAccount.error.details[0].message.replace('"', '').replace('"', '') });
  }

  // ================================== CHANGE ACCOUNT STATUS ==============================
  static changeAccountStatus(req, res) {
    const { status } = req.body;
    const checkStatus = schemaStatus.validate(req.body);
    if (checkStatus.error) {
      return res.status(400).json({ status: 400, error: 'account can only be change to dormant, draft, or active' });
    }
    const searchUser = search.searchUser(req.user.id);
    if (searchUser.isAdmin === true) {
      const searchBankAccount = bankAccount.find(account => account.accountNumber === req.params.id);
      if (searchBankAccount) {
        const updateAccount = {
          id: searchBankAccount.id,
          accountNumber: searchBankAccount.accountNumber,
          createdOn: searchBankAccount.createdOn,
          owner: searchBankAccount.owner,
          type: searchBankAccount.type,
          status,
          balance: searchBankAccount.balance,
        };
        bankAccount[searchBankAccount.id - 1] = updateAccount;
        return res.status(200).json({ status: 200, data: { accountNumber: searchBankAccount.accountNumber, status } });
      }
      return res.status(404).json({ status: 404, message: 'account not found' });
    }
    return res.status(401).json({ status: 401, message: 'permission denied please contact the admin' });
  }

  // ================================== DELETE ACCOUNT ==============================
  static deleteAccount(req, res) {
    const findUser = search.searchUser(req.user.id);
    const findAccount = bankAccount.find(account => account.id === parseInt(req.params.id, 10));
    if (findAccount) {
      if (findUser.type === 'Staff') {
        bankAccount.pop(parseInt(req.params.id, 10));
        return res.status(200).json({ status: 200, message: 'Account successfully deleted' });
      }
      return res.status(401).json({ status: 401, message: 'permission denied' });
    }
    return res.status(404).json({ status: 404, message: 'Account not found' });
  }

  // ================================== DISPLAY ACCOUNTS ==============================
  static displayAccouts(req, res) {
    const findUser = search.searchUser(req.user.id);
    if (findUser.type === 'Staff') {
      return res.status(200).json({ status: 200, data: bankAccount });
    }
    return res.status(401).json({ status: 401, message: 'permission denied' });
  }

  // ================================== DISPLAY ACCOUNTS ==============================
  static searchAccount(req, res) {
    const findUser = search.searchUser(req.user.id);
    if (findUser.type === 'Staff') {
      const getAccount = search.searchAccount(req.params.id);
      if (getAccount) {
        return res.status(200).json({ status: 200, data: getAccount });
      }
      return res.status(404).json({ status: 404, message: 'account not found' });
    }
    return res.status(401).json({ status: 401, message: 'permission denied' });
  }
}
export default accountController;
