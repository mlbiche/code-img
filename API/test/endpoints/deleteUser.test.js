const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');
const { insertUser } = require('../common/user/insertUser');
const userTestBase = require('../common/user/userTestBase');

chai.use(chaiHttp);

// Test POST /deleteUser endpoint
describe('POST /deleteUser endpoint', function () {
  userTestBase();

  // Delete an unexisting user
  it('When deleting an unexisting user, the API sends back a 202 HTTP success code.', async function () {
    const userId = new mongoose.Types.ObjectId();

    const res = await chai.request(app)
      .delete(`/${userId}`);

    // Check that HTTP code 202 has been received
    expect(res).to.have.status(202);
  });

  // Delete an existing user
  it('When deleting an existing user, the API sends back a 202 HTTP success code.', async function () {
    // Insert a user in the database
    const insertedUser = await insertUser(true);

    // Delete this user
    const res = await chai.request(app)
      .delete(`/${insertedUser._id}`);

    // Check that HTTP code 202 has been received
    expect(res).to.have.status(202);
  });
});
