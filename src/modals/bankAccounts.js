import moment from 'moment';

const bankAccounts = [
  {
    id: 1,
    accountNumber: '1',
    createdOn: moment.utc().format(),
    owner: 1,
    type: 'savings',
    status: 'active',
    balance: 12000,
  },
];
export default bankAccounts;
