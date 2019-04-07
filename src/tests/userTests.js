/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

describe('User tests', () => {
  it('should be able to signup', (done) => {
    const user = {
      id: 1,
      firstName: 'James',
      lastName: 'Shema',
      email: 'james@gmail.com',
      password: '12345678',
      type: 'client',
      isAdmin: 'false',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.should.be.an('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('isAdmin');
      });
    done();
  });
});
