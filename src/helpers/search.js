import user from '../modals/user';
import account from '../modals/bankAccounts';

class search {
  static searchUser(id) {
    const searchUser = user.find(usr => usr.id === id);
    return searchUser;
  }

  static searchAccount(id) {
    const searchAccount = account.find(acct => acct.accountNumber === id);
    return searchAccount;
  }
}
export default search;
