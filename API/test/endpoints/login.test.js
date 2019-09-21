const { User } = require('../../model/schema/user');

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');
const argon2 = require('argon2');

chai.use(chaiHttp);

// Test POST /login endpoint
describe('POST /login endpoint', function() {
  // Empty the User collection when starting /login test
  before(async () => {
    await User.deleteMany({});
  });

  // Empty the User collection after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Log in to an unexisting user
  it('When logging in to an unexisting user, then the API sends back a 401 HTTP error code.', async function() {
    const unexistingUser = {
      email: 'test@email.com',
      password: '%bTi2Y!9Vvw&'
    };

    try {
      const res = await chai.request(app)
        .post('/login')
        .type('application/json')
        .send(JSON.stringify(unexistingUser));

      // Check that HTTP code 401 has been received
      expect(res).to.have.status(401);
    } catch (err) {
      console.log('Request to /login has failed.');
      console.log(err);
      throw new Error('Request has failed');
    }
  });

  // Log in with a missing email
  it('When the email is missing, the API sends back a 422 HTTP error code.', async function() {
    const user = {
      password: '%bTi2Y!9Vvw&'
    };

    try {
      const res = await chai.request(app)
        .post('/login')
        .type('application/json')
        .send(JSON.stringify(user));

      // Check that HTTP code 422 has been received
      expect(res).to.have.status(422);
      // Check that the invalid parameter is the email
      expect(res.body).to.have.nested.property('errors[0].param', 'email');
    } catch (err) {
      console.log('Request to /login has failed.');
      console.log(err);
      throw new Error('Request has failed');
    }
  });

  // Log in with a missing password
  it('When the password is missing, the API sends back a 422 HTTP error code.', async function() {
    const user = {
      email: 'test@email.com'
    };

    try {
      const res = await chai.request(app)
        .post('/login')
        .type('application/json')
        .send(JSON.stringify(user));

      // Check that HTTP code 422 has been received
      expect(res).to.have.status(422);
      // Check that the invalid parameter is the password
      expect(res.body).to.have.nested.property('errors[0].param', 'password');
    } catch (err) {
      console.log('Request to /login has failed.');
      console.log(err);
      throw new Error('Request has failed');
    }
  });

  // Log in with a misformatted email
  it('When the email is misformatted, the API sends back a 422 HTTP error code.', async function() {
    const user = {
      email: 'test@emailcom',
      password: '%bTi2Y!9Vvw&'
    };

    try {
      const res = await chai.request(app)
        .post('/login')
        .type('application/json')
        .send(JSON.stringify(user));

      // Check that HTTP code 422 has been received
      expect(res).to.have.status(422);
      // Check that the invalid parameter is the email
      expect(res.body).to.have.nested.property('errors[0].param', 'email');
    } catch (err) {
      console.log('Request to /login has failed.');
      console.log(err);
      throw new Error('Request has failed');
    }
  });

  // Log in to an existing user
  it('When logging in to an existing user, the API sends back a 200 HTTP success code.', async function() {
    const loginUser = {
      email: 'test@email.com',
      password: '%bTi2Y!9Vvw&'
    };

    let hashPassword;

    try {
      hashPassword = await argon2.hash(loginUser.password);
    } catch (err) {
      console.log('New user creation has failed (hash failure).');
      console.log(err);

      throw err;
    }

    const fullUser = new User({
      email: loginUser.email,
      password: hashPassword,
      username: 'test'
    });

    try {
      await fullUser.save();
    } catch (err) {
      console.log('New user creation has failed (insertion failure).');
      console.log(err);

      throw err;
    }

    try {
      const res = await chai.request(app)
        .post('/login')
        .type('application/json')
        .send(JSON.stringify(loginUser));

      // Check that HTTP code 200 has been received
      expect(res).to.have.status(200);
    } catch (err) {
      console.log('Request to /login has failed.');
      console.log(err);
      throw new Error('Request has failed');
    }
  });
});
