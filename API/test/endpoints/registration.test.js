const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');
const { insertUser, currentUser } = require('../common/user/insertUser');
const userTestBase = require('../common/user/userTestBase');

chai.use(chaiHttp);

// Test POST /registration endpoint
describe('POST /registration endpoint', function () {
  userTestBase();

  // Register with a missing email
  it('When the email is missing, the API sends back a 422 HTTP error code.', async function () {
    const user = {
      password: currentUser().password,
      username: currentUser().username
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
  it('When the password is missing, the API sends back a 422 HTTP error code.', async function () {
    const user = {
      email: currentUser().email,
      username: currentUser().username
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
  it('When the username is missing, the API sends back a 422 HTTP error code.', async function () {
    const user = {
      email: currentUser().email,
      password: currentUser().password
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
  it('When the email is misformatted, the API sends back a 422 HTTP error code.', async function () {
    const user = {
      email: 'test@emailcom',
      password: currentUser().password,
      username: currentUser().username
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
  it('When registering with an already used email, the API sends back a 409 HTTP error code.', async function () {
    // Insert a user in the database
    const insertedUser = await insertUser(false);

    const newUser = {
      email: insertedUser.email,
      password: currentUser().password,
      username: currentUser().username
    };

    // Register this user
    const res = await chai.request(app)
      .post('/registration')
      .type('application/json')
      .send(JSON.stringify(newUser));

    // Check that HTTP code 409 has been received
    expect(res).to.have.status(409);
  });

  // Register with an already used username
  it('When registering with an already used username, the API sends back a 409 HTTP error code.', async function () {
    // Insert a user in the database
    const insertedUser = await insertUser();

    const newUser = {
      email: currentUser().email,
      password: currentUser().password,
      username: insertedUser.username
    };

    // Register this user
    const res = await chai.request(app)
      .post('/registration')
      .type('application/json')
      .send(JSON.stringify(newUser));

    // Check that HTTP code 409 has been received
    expect(res).to.have.status(409);
  });

  // Register a correct user
  it('When registering a correct user, the API sends back a 201 HTTP success code.', async function () {
    // Register this user
    const res = await chai.request(app)
      .post('/registration')
      .type('application/json')
      .send(JSON.stringify(currentUser()));

    // Check that HTTP code 201 has been received
    expect(res).to.have.status(201);
  });
});
