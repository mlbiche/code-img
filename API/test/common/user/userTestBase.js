const { User } = require('../../../model/schema/user');
const { initIndex } = require('./insertUser');

module.exports = function () {
  // Empty the User collection when starting /login test
  before(async () => {
    await User.deleteMany({});
  });
  
  // Reinitialise the mock user index before each test
  beforeEach(() => {
    initIndex();
  });
  
  // Empty the User collection after each test
  afterEach(async () => {
    await User.deleteMany({});
  });
}