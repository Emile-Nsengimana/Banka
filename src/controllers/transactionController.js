import moment from 'moment';
import transactionModal from '../modals/transactionModal';
import search from '../helpers/search';
import schema from './validation/transactionSchema';

class transactionController {
  static debitAccount(req, res) {
    const { amount } = req.body;
    const user = search.searchUser(req.user.id);
    if (user.type === 'Staff' && user.isAdmin === false) {
      const account = search.searchAccount(parseInt(req.params.accountNo, 10));
      if (account) {
        const newTransaction = schema.validate({
          id: transactionModal.length + 1,
          createdOn: moment.utc().format(),
          type: 'Debit',
          accountNumber: req.params.accountNo,
          cashier: user.id,
          amount,
          oldBalance: account.balance,
          newBalance: account.balance - amount,
        });
        if (!newTransaction.error) {
          transactionModal.push(newTransaction);
          return res.status(200).json({
            status: 200,
            data: newTransaction.value,
          });
        }
        return res.status(400).json({
          status: 400,
          error: newTransaction.error.details[0].message.replace('"', ' ').replace('"', ''),
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'account not found',
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'you are not allowed to perfom this action',
    });
  }
}
export default transactionController;
