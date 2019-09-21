const request = require('request');
const expect = require('chai').expect;
const argon2 = require('argon2');
const { User } = require('../../model/schema/user');

// Test /login endpoint
describe('/login', function () {
  // Empty the User collection before testing
  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Log in to an unexisting user
  it('Log in to an unexisting user should receive 401', function () {
    const unexistingUser = {
      email: 'test@email.com',
      password: 'passwordTest'
    };

    request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      json: true,
      body: unexistingUser,
    }, (err, res, body) => {
      if (err) {
        console.log('Request to /login has failed. Please check that the API is started.');
        console.log(err);
        throw new Error('Request has failed');
      }

      // Check that HTTP code 401 has been received
      expect(res.statusCode).to.equal(401);
    });
  });

  // Log in with a missing email
  it('Log in with a missing email should receive 422', function () {
    const user = {
      password: 'passwordTest'
    };

    request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      json: true,
      body: user,
    }, (err, res, body) => {
      if (err) {
        console.log('Request to /login has failed. Please check that the API is started.');
        console.log(err);
        throw new Error('Request has failed');
      }

      // Check that HTTP code 422 has been received
      expect(res.statusCode).to.equal(422);
      // Check that the invalid parameter is the email
      expect(body).to.have.nested.property('errors[0].param', 'email');
    });
  });

  // Log in with a missing password
  it('Log in with a missing password should receive 422', function () {
    const user = {
      email: 'test@email.com'
    };

    request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      json: true,
      body: user,
    }, (err, res, body) => {
      if (err) {
        console.log('Request to /login has failed. Please check that the API is started.');
        console.log(err);
        throw new Error('Request has failed');
      }

      // Check that HTTP code 422 has been received
      expect(res.statusCode).to.equal(422);
      // Check that the invalid parameter is the password
      expect(body).to.have.nested.property('errors[0].param', 'password');
    });
  });

  // Log in with a misformatted email
  it('Log in with a misformatted email should receive 422', function () {
    const user = {
      email: 'test@emailcom',
      password: 'passwordTest'
    };

    request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      json: true,
      body: user,
    }, (err, res, body) => {
      if (err) {
        console.log('Request to /login has failed. Please check that the API is started.');
        console.log(err);
        throw new Error('Request has failed');
      }

      // Check that HTTP code 422 has been received
      expect(res.statusCode).to.equal(422);
      // Check that the invalid parameter is the email
      expect(body).to.have.nested.property('errors[0].param', 'email');
    });
  });

  // Log in to an existing user
  it('Log in with an existing user should receive 200', async function () {
    const loginUser = {
      email: 'test@email.com',
      password: 'passwordTest'
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

    request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      json: true,
      body: loginUser,
    }, (err, res, body) => {
      if (err) {
        console.log('Request to /login has failed. Please check that the API is started.');
        console.log(err);
        throw new Error('Request has failed');
      }

      // Check that HTTP code 200 has been received
      expect(res.statusCode).to.equal(200);
    });
  });
});
