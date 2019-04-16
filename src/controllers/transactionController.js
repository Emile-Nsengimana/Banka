import transactionModal from '../modals/transactionModal';
import search from '../helpers/search';
import bankAccounts from '../modals/bankAccounts';
import makeTransaction from '../helpers/transaction';

class transactionController {
  // ========================================= DEBIT ACCOUNT ====================================
  static debitAccount(req, res) {
    const { amount } = req.body;
    const user = search.searchUser(req.user.id);
    if (user.type === 'Staff' && user.isAdmin === false) {
      const account = search.searchAccount(req.params.accountNo);
      if (account) {
        if (bankAccounts[account.id - 1].balance < amount) {
          return res.status(406).json({ status: 406, message: 'insufficient fund' });
        }
        const debitAccount = makeTransaction.updateBankAccount(account, account.balance - amount);
        bankAccounts.pop(account.id - 1);
        bankAccounts[account.id - 1] = debitAccount;
        const newTransaction = makeTransaction.makeTransaction('debit', amount, req.user.id, account.accountNumber, account.balance, account.balance - amount);
        if (!newTransaction.error) {
          transactionModal.push(newTransaction);
          return res.status(200).json({ status: 200, data: newTransaction.value });
        }
        return res.status(400).json({
          status: 400,
          error: newTransaction.error.details[0].message.replace('"', ' ').replace('"', ''),
        });
      }
      return res.status(404).json({ status: 404, error: 'account not found' });
    }
    return res.status(401).json({ status: 401, error: 'you are not allowed to perfom this action' });
  }

  // ========================================= CREDIT ACCOUNT ====================================
  static creditAccount(req, res) {
    const { amount } = req.body;
    const user = search.searchUser(req.user.id);
    if (user.type === 'Staff' && user.isAdmin === false) {
      const account = search.searchAccount(req.params.accountNo);
      if (account) {
        const creditAccount = makeTransaction.updateBankAccount(account, account.balance + amount);
        bankAccounts.pop(account.id - 1);
        bankAccounts[account.id - 1] = creditAccount;
        const newTransaction = makeTransaction.makeTransaction('credit', amount, req.user.id, account.accountNumber, account.balance, account.balance + amount);
        if (!newTransaction.error) {
          transactionModal.push(newTransaction.value);
          return res.status(200).json({ status: 200, data: newTransaction.value });
        }
        return res.status(400).json({ status: 400, error: newTransaction.error.details[0].message.replace('"', ' ').replace('"', '') });
      }
      return res.status(404).json({ status: 404, error: 'account not found' });
    }
    return res.status(401).json({ status: 401, error: 'you are not allowed to perfom this action' });
  }
}
export default transactionController;
