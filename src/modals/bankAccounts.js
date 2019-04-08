import moment from 'moment';

const bankAccounts = [
  {
    id: 1,
    accountNumber: 1,
    createdOn: moment.utc().format(),
    owner: 1,
    type: 'savings',
    status: 'active',
    balance: 12000.89,
  },
  {
    id: 2,
    accountNumber: 2,
    createdOn: moment.utc().format(),
    owner: 1,
    type: 'current',
    status: 'active',
    balance: 15000.00,
  },
];
export default bankAccounts;
