/* eslint-disable max-len */
import moment from 'moment';
import bankAccount from '../modals/bankAccounts';
import userModal from '../modals/user';
import schema from './validation/bankAccountSchema';

class accountController {
  // ======================================== BANK ACCOUNTS ====================================
  static createAccount(req, res) {
    const { type, balance } = req.body;
    const { id } = req.user;
    const accountOwner = userModal.find(usr => usr.id === id);
    const newAccount = schema.validate({
      id: bankAccount.length + 1,
      accountNumber: bankAccount.length + 1,
      createdOn: moment.utc().format(),
      owner: id,
      type,
      status: 'active',
      balance,
    });
    if (!newAccount.error) {
      bankAccount.push(newAccount);
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
    return res.status(400).json({
      status: 400,
      error: newAccount.error.details[0].message.replace('"', ' ').replace('"', ''),
    });
  }

  // ================================== CHANGE ACCOUNT STATUS ==============================
  static changeAccountStatus(req, res) {
    const { status } = req.body;
    const searchUser = userModal.find(user => user.id === req.user.id);
    // console.log(req.user);
    if (searchUser.isAdmin === true) {
      const searchBankAccount = bankAccount.find(account => account.accountNumber === parseInt(req.params.id, 10));
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
        return res.status(200).json({
          status: 200,
          data: {
            accountNumber: searchBankAccount.accountNumber,
            status,
          },
        });
      }
      return res.status(404).json({
        status: 404,
        data: 'account not found',
      });
    }
    return res.status(401).json({
      status: 401,
      message: 'permission denied please contact the admin',
    });
  }
}
export default accountController;
