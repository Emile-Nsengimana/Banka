/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

describe('Bank account tests', () => {
  it('should be able to create new bank account', (done) => {
    const newAccount = {
      type: 'savings',
      balance: 12000.89,
    };
    chai.request(server)
      .post('/api/v1/accounts')
      .send(newAccount)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0NzQzOTgxLCJleHAiOjE1NTQ4MzAzODF9.5_MCQAzA3ETWdGRHu72jVYhGyjzIna3opGpVlnCweFs')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(201);
        res.body.data.should.have.property('accountNumber');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('openingBalance');
      });
    done();
  });
  it('should not be able to create new bank account for unkown user', (done) => {
    const newAccount = {
      type: 'savings',
      balance: 12000.89,
    };
    chai.request(server)
      .post('/api/v1/accounts')
      .send(newAccount)
      .set('token', 'invalid token')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(401);
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('should not be able to create new bank account without required information', (done) => {
    const newAccount = {
      type: 'savings',
    };
    chai.request(server)
      .post('/api/v1/accounts')
      .send(newAccount)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0NzQzOTgxLCJleHAiOjE1NTQ4MzAzODF9.5_MCQAzA3ETWdGRHu72jVYhGyjzIna3opGpVlnCweFs')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(400);
        res.body.error.should.be.a('string');
      });
    done();
  });
});
