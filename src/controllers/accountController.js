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
      accountNo: bankAccount.length + 1,
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
          accountNumber: newAccount.accountNo,
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
}
export default accountController;
