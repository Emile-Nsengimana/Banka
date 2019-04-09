import moment from 'moment';

const transaction = [
  {
    id: 1,
    createdOn: moment.utc().format(),
    type: 'credit',
    accountNumber: 1,
    cashier: 1,
    amount: 1000.00,
    oldBalance: 12000.79,
    newBalance: 13000.79,
  },
  {
    id: 2,
    createdOn: moment.utc().format(),
    type: 'debit',
    accountNumber: 1,
    cashier: 1,
    amount: 1000.00,
    oldBalance: 12000.79,
    newBalance: 11000.79,
  },
];
export default transaction;

