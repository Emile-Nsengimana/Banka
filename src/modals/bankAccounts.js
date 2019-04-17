import moment from 'moment';

const bankAccounts = [
  {
    id: 1,
    accountNumber: '153240580-6148-11e9-9c14-1d5134eb636e',
    createdOn: moment.utc().format(),
    owner: 1,
    type: 'savings',
    status: 'active',
    balance: 12000,
  },
];
export default bankAccounts;
