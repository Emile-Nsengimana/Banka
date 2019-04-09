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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU0ODQwNjIzLCJleHAiOjE1NTcwMDA2MjN9.3-1NbW3SLdAuSPM33ExSRjr5sNz_r-RxnS5sW-WdyuU')
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU0ODQwNjIzLCJleHAiOjE1NTcwMDA2MjN9.3-1NbW3SLdAuSPM33ExSRjr5sNz_r-RxnS5sW-WdyuU')
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU0NzU2NzEzLCJleHAiOjE1NTQ4NDMxMTN9.898AB24DzRe6sWKjJEzNxM3X3VQQTYDQsW87P2Slv-E')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(200);
        res.body.data.should.have.property('accountNumber');
        res.body.data.should.have.property('status');
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
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTU0NzU4NzA5LCJleHAiOjE1NTQ4NDUxMDl9.X3e6XCrDcH0u0HuQBKsGOcRvjQcGW0D3ng1R5n492cE')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(200);
        res.body.status.should.a('number');
        res.body.message.should.be.a('string');
      });
    done();
  });
  it('normal user should not be able to delete user account', (done) => {
    chai.request(server)
      .delete('/api/v1/account/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0NzU5MDAzLCJleHAiOjE1NTQ4NDU0MDN9.0xjQGwCDC08Rdze9GfruW4hGBc3D2OJzRuQ63CpAGSY')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.status.should.be.equal(401);
        res.body.status.should.a('number');
        res.body.message.should.be.a('string');
      });
    done();
  });
});
