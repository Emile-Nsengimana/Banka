/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0ODg3NDAyfQ.BgWDFVVMvTMvDpOZcbIyiDkMfOTkAxH8seQ_5b_AIIM')
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
      type: '',
    };
    chai.request(server)
      .post('/api/v1/accounts')
      .send(newAccount)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0ODg3NDAyfQ.BgWDFVVMvTMvDpOZcbIyiDkMfOTkAxH8seQ_5b_AIIM')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(400);
        res.body.error.should.be.a('string');
      });
    done();
  });
  it('admin should be able to activate or deactivate user account', (done) => {
    const changeStatus = {
      status: 'dormant',
    };
    chai.request(server)
      .patch('/api/v1/account/1')
      .send(changeStatus)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU0OTAyMDA2fQ.4MP143brnM6woj-vF9Zaqjglg0PGHrqpSVQBeEkc7VE')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(200);
        res.body.data.should.have.property('accountNumber');
        res.body.data.should.have.property('status');
      });
    done();
  });

  it('should not be able to activate or deactivate unexisting user account', (done) => {
    const changeStatus = {
      status: 'dormant',
    };
    chai.request(server)
      .patch('/api/v1/account/99')
      .send(changeStatus)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU0OTAyMDA2fQ.4MP143brnM6woj-vF9Zaqjglg0PGHrqpSVQBeEkc7VE')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(404);
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('non-admin should not be able to activate or deactivate user account', (done) => {
    const changeStatus = {
      status: 'dormant',
    };
    chai.request(server)
      .patch('/api/v1/account/1')
      .send(changeStatus)
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0NzU3MDg0LCJleHAiOjE1NTQ4NDM0ODR9.tlgalZ0NUEfE9YOXJO4cDpe86HHDewLH0zOkcJAYsYU')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(401);
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('staff member should be able to delete user account', (done) => {
    chai.request(server)
      .delete('/api/v1/account/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU0OTAyMDA2fQ.4MP143brnM6woj-vF9Zaqjglg0PGHrqpSVQBeEkc7VE')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(200);
        res.body.status.should.a('number');
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('should not be able to delete unexsting user account', (done) => {
    chai.request(server)
      .delete('/api/v1/account/99')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU0OTAyMDA2fQ.4MP143brnM6woj-vF9Zaqjglg0PGHrqpSVQBeEkc7VE')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(404);
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('normal user should not be able to delete user account', (done) => {
    chai.request(server)
      .delete('/api/v1/account/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0OTM3NDkzfQ.8CCybOLYl5v-wabK5k3nXWPL6fNXpWp_e9ULQW4KdPQ')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(401);
        res.body.status.should.a('number');
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('should be to display all accounts', (done) => {
    chai.request(server)
      .get('/api/v1/accounts')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0OTIyNzE4fQ.wq8JS1pWjFxjOV4GUJIp1gw9ejtSx0dG_7bLG-ObhPs')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(200);
        res.body.data.should.an('array');
      });
    done();
  });
  it('only staff should be allowed to view all accounts', (done) => {
    chai.request(server)
      .get('/api/v1/accounts')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0OTIzMjc2fQ.WsrLbMeIZEPNUAfZ1ifJbmz6W-RxjxbUyCCoUQVj2J0')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(401);
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('should be able to view a specific bank account', (done) => {
    chai.request(server)
      .get('/api/v1/accounts/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0OTI0NzA3fQ.Rgwf9MkKUDhj798vkJ6Bko01PEueoAjZ-kTxKVwmmJY')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(200);
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('accountNumber');
        res.body.data.should.have.property('createdOn');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('status');
        res.body.data.should.have.property('balance');
      });
    done();
  });
  it('should not be able to view a unexisting bank account', (done) => {
    chai.request(server)
      .get('/api/v1/accounts/99')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTU0OTI0NzA3fQ.Rgwf9MkKUDhj798vkJ6Bko01PEueoAjZ-kTxKVwmmJY')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(404);
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('client should not be allowed to view a specific bank account', (done) => {
    chai.request(server)
      .get('/api/v1/accounts/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0OTI0ODQ4fQ.Ni_iLkJGoeVfl2EVomM5XDRR5NNgrBK2OjabNl1KyZA')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(401);
        res.body.message.should.be.a('string');
      });
    done();
  });
});
