const { User } = require('../../model/schema/user');

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');
const argon2 = require('argon2');

chai.use(chaiHttp);

// Test POST /registration endpoint
describe('POST /registration endpoint', function() {
  // Empty the User collection when starting /registration test
  before(async () => {
    await User.deleteMany({});
  });

  // Empty the User collection after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Register with a missing email
  it('When the email is missing, the API sends back a 422 HTTP error code.', async function() {
    const user = {
      password: '%bTi2Y!9Vvw&',
      username: 'test'
    };

    const res = await chai.request(app)
      .post('/registration')
      .type('application/json')
      .send(JSON.stringify(user));

    // Check that HTTP code 422 has been received
    expect(res).to.have.status(422);
    // Check that the invalid parameter is the email
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.a('array');
    expect(res.body.errors).to.have.length(1);
    expect(res.body.errors[0]).to.be.a('object');
    expect(res.body.errors[0]).to.have.property('param', 'email');
  });

  // Register with a missing password
  it('When the password is missing, the API sends back a 422 HTTP error code.', async function() {
    const user = {
      email: 'test@email.com',
      username: 'test'
    };

    const res = await chai.request(app)
      .post('/registration')
      .type('application/json')
      .send(JSON.stringify(user));

    // Check that HTTP code 422 has been received
    expect(res).to.have.status(422);
    // Check that the invalid parameter is the password
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.a('array');
    expect(res.body.errors).to.have.length(1);
    expect(res.body.errors[0]).to.be.a('object');
    expect(res.body.errors[0]).to.have.property('param', 'password');
  });

  // Register with a missing username
  it('When the username is missing, the API sends back a 422 HTTP error code.', async function() {
    const user = {
      email: 'test@email.com',
      password: '%bTi2Y!9Vvw&'
    };

    const res = await chai.request(app)
      .post('/registration')
      .type('application/json')
      .send(JSON.stringify(user));

    // Check that HTTP code 422 has been received
    expect(res).to.have.status(422);
    // Check that the invalid parameter is the username
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.a('array');
    expect(res.body.errors).to.have.length(1);
    expect(res.body.errors[0]).to.be.a('object');
    expect(res.body.errors[0]).to.have.property('param', 'username');
  });

  // Register with a misformatted email
  it('When the email is misformatted, the API sends back a 422 HTTP error code.', async function() {
    const user = {
      email: 'test@emailcom',
      password: '%bTi2Y!9Vvw&',
      username: 'test'
    };

    const res = await chai.request(app)
      .post('/registration')
      .type('application/json')
      .send(JSON.stringify(user));

    // Check that HTTP code 422 has been received
    expect(res).to.have.status(422);
    // Check that the invalid parameter is the email
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.a('array');
    expect(res.body.errors).to.have.length(1);
    expect(res.body.errors[0]).to.be.a('object');
    expect(res.body.errors[0]).to.have.property('param', 'email');
  });

  // Register with an already used email
  it('When registering with an already used email, the API sends back a 409 HTTP error code.', async function() {
    // Insert a user in the database
    const user1 = {
      email: 'test@email.com',
      password: '%bTi2Y!9Vvw&',
      username: 'test1'
    };

    let hashPassword1;

    try {
      hashPassword1 = await argon2.hash(user1.password);
    } catch (err) {
      console.log('New user creation has failed (hash failure).');
      console.log(err);

      throw err;
    }

    const fullUser1 = new User({
      email: user1.email,
      password: hashPassword1,
      username: user1.username
    });

    try {
      await fullUser1.save();
    } catch (err) {
      console.log('New user creation has failed (insertion failure).');
      console.log(err);

      throw err;
    }

    const user2 = {
      email: 'test@email.com',
      password: '%bTi2Y!9Vvw&',
      username: 'test2'
    };

    // Register this user
    const res = await chai.request(app)
      .post('/registration')
      .type('application/json')
      .send(JSON.stringify(user2));

    // Check that HTTP code 409 has been received
    expect(res).to.have.status(409);
  });

  // Register with an already used username
  it('When registering with an already used username, the API sends back a 409 HTTP error code.', async function() {
    // Insert a user in the database
    const user1 = {
      email: 'test1@email.com',
      password: '%bTi2Y!9Vvw&',
      username: 'test'
    };

    let hashPassword1;

    try {
      hashPassword1 = await argon2.hash(user1.password);
    } catch (err) {
      console.log('New user creation has failed (hash failure).');
      console.log(err);

      throw err;
    }

    const fullUser1 = new User({
      email: user1.email,
      password: hashPassword1,
      username: user1.username
    });

    try {
      await fullUser1.save();
    } catch (err) {
      console.log('New user creation has failed (insertion failure).');
      console.log(err);

      throw err;
    }

    const user2 = {
      email: 'test2@email.com',
      password: '%bTi2Y!9Vvw&',
      username: 'test'
    };

    // Register this user
    const res = await chai.request(app)
      .post('/registration')
      .type('application/json')
      .send(JSON.stringify(user2));

    // Check that HTTP code 409 has been received
    expect(res).to.have.status(409);
  });

  // Register a correct user
  it('When registering a correct user, the API sends back a 201 HTTP success code.', async function() {
    const user = {
      email: 'test@email.com',
      password: '%bTi2Y!9Vvw&',
      username: 'test'
    };

    // Register this user
    const res = await chai.request(app)
      .post('/registration')
      .type('application/json')
      .send(JSON.stringify(user));

    // Check that HTTP code 201 has been received
    expect(res).to.have.status(201);
  });
});
