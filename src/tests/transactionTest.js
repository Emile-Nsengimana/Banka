/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

describe('Transaction tests', () => {
  // ========================================== DEBIT ACCOUNT ==========================
  it('should be able to debit a bank account', (done) => {
    const debit = {
      amount: 1000.11,
    };
    chai.request(server)
      .post('/api/v1/transactions/1/debit')
      .send(debit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0OTAwNTg5fQ.xCKXCWa4fzmTUi1rd2EgGSdgbOEhVXPe9AqmgkAyTbs')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.should.be.an('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('createdOn');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('accountNumber');
        res.body.data.should.have.property('cashier');
        res.body.data.should.have.property('amount');
        res.body.data.should.have.property('oldBalance');
        res.body.data.should.have.property('newBalance');
      });
    done();
  });
  it('should not be able to debit unexisting bank account', (done) => {
    const debit = {
      amount: 1000.11,
    };
    chai.request(server)
      .post('/api/v1/transactions/99/debit')
      .send(debit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0OTAwNTg5fQ.xCKXCWa4fzmTUi1rd2EgGSdgbOEhVXPe9AqmgkAyTbs')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });
  it('should not be able to debit a bank account with insufficient fund', (done) => {
    const debit = {
      amount: 10000000000,
    };
    chai.request(server)
      .post('/api/v1/transactions/1/debit')
      .send(debit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0OTAwNTg5fQ.xCKXCWa4fzmTUi1rd2EgGSdgbOEhVXPe9AqmgkAyTbs')
      .end((err, res) => {
        res.body.status.should.be.equal(406);
        res.body.should.be.an('object');
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('only cashier should be allowed to debit a bank account', (done) => {
    const debit = {
      amount: 1000.11,
    };
    chai.request(server)
      .post('/api/v1/transactions/1/debit')
      .send(debit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0OTAxMDA0fQ.LrfNzgmO3v2JKV2iXIEeyh4kXu54QImea17Mx3mlmN8')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });

  // ========================================== CREDIT ACCOUNT ==========================
  it('should be able to credit a bank account', (done) => {
    const credit = {
      amount: 1000,
    };
    chai.request(server)
      .post('/api/v1/transactions/1/credit')
      .send(credit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0OTAwNTg5fQ.xCKXCWa4fzmTUi1rd2EgGSdgbOEhVXPe9AqmgkAyTbs')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.should.be.an('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('createdOn');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('accountNumber');
        res.body.data.should.have.property('cashier');
        res.body.data.should.have.property('amount');
        res.body.data.should.have.property('oldBalance');
        res.body.data.should.have.property('newBalance');
      });
    done();
  });
  it('should not be able to debit a bank account with invalid data', (done) => {
    const debit = {
      amount: 'one',
    };
    chai.request(server)
      .post('/api/v1/transactions/1/debit')
      .send(debit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0OTAwNTg5fQ.xCKXCWa4fzmTUi1rd2EgGSdgbOEhVXPe9AqmgkAyTbs')
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });


  it('should not be able to credit unexisting bank account', (done) => {
    const credit = {
      amount: 1000.11,
    };
    chai.request(server)
      .post('/api/v1/transactions/99/credit')
      .send(credit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0OTAwNTg5fQ.xCKXCWa4fzmTUi1rd2EgGSdgbOEhVXPe9AqmgkAyTbs')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });
  it('only cashier should be allowed to credit a bank account', (done) => {
    const credit = {
      amount: 1000.11,
    };
    chai.request(server)
      .post('/api/v1/transactions/1/credit')
      .send(credit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0OTAxMDA0fQ.LrfNzgmO3v2JKV2iXIEeyh4kXu54QImea17Mx3mlmN8')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });
  it('should not be able to credit a bank account with invalid data', (done) => {
    const credit = {
      amount: 'one',
    };
    chai.request(server)
      .post('/api/v1/transactions/1/credit')
      .send(credit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0OTAwNTg5fQ.xCKXCWa4fzmTUi1rd2EgGSdgbOEhVXPe9AqmgkAyTbs')
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });
});
