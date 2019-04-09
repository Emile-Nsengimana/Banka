/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

describe('Transaction tests', () => {
  // ========================================== SIGNUP ==========================
  it('should be able to debit a bank account', (done) => {
    const debit = {
      amount: 1000.11,
    };
    chai.request(server)
      .post('/api/v1/transactions/1/debit')
      .send(debit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0ODM3NTgyLCJleHAiOjE1NTQ5MjM5ODJ9.lGeDRPbFVzNI-g0qAU16KgeszsdOFZjkIOi8Qee2PqY')
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0ODQxMDE4LCJleHAiOjE1NTcwMDEwMTh9.xCjcbWAlOY44JBn96JYYuYJTQo_Iy_18azipGhFFj6Q')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });
  it('only cashier should be able allowed to debit a bank account', (done) => {
    const debit = {
      amount: 1000.11,
    };
    chai.request(server)
      .post('/api/v1/transactions/1/debit')
      .send(debit)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0ODQxMzA1LCJleHAiOjE1NTcwMDEzMDV9.sJnuBMvYOSHOfh_Wrz_cmpQcGq6zV1Gnc9qIWQAGZtY')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0ODM3NTgyLCJleHAiOjE1NTQ5MjM5ODJ9.lGeDRPbFVzNI-g0qAU16KgeszsdOFZjkIOi8Qee2PqY')
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
        res.body.error.should.be.a('string');
      });
    done();
  });
});
