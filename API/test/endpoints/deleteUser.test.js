const { User } = require('../../model/schema/user');
const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');
const argon2 = require('argon2');

chai.use(chaiHttp);

// Test POST /deleteUser endpoint
describe('POST /deleteUser endpoint', function() {
  // Empty the User collection when starting /deleteUser test
  before(async () => {
    await User.deleteMany({});
  });

  // Empty the User collection after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Delete an unexisting user
  it('When deleting an unexisting user, the API sends back a 202 HTTP success code.', async function() {
    const userId = new mongoose.Types.ObjectId();

    const res = await chai.request(app)
      .delete(`/${userId}`);

    // Check that HTTP code 202 has been received
    expect(res).to.have.status(202);
  });

  // Delete an existing user
  it('When deleting an existing user, the API sends back a 202 HTTP success code.', async function() {
    // Insert a user in the database
    const user = {
      email: 'test@email.com',
      password: '%bTi2Y!9Vvw&',
      username: 'test1'
    };

    let hashPassword;

    try {
      hashPassword = await argon2.hash(user.password);
    } catch (err) {
      console.log('New user creation has failed (hash failure).');
      console.log(err);

      throw err;
    }

    const fullUser = new User({
      email: user.email,
      password: hashPassword,
      username: user.username
    });

    try {
      await fullUser.save();
    } catch (err) {
      console.log('New user creation has failed (insertion failure).');
      console.log(err);

      throw err;
    }

    // Delete this user
    const res = await chai.request(app)
      .delete(`/${fullUser._id}`);

    // Check that HTTP code 202 has been received
    expect(res).to.have.status(202);
  });
});
