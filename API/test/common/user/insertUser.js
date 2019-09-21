const argon2 = require('argon2');
const { User } = require('../../../model/schema/user');

const USERS = [
  {
    email: 'test1@email.com',
    password: 'q5aBCHu%#xd9',
    username: 'user1'
  },
  {
    email: 'test2@email.com',
    password: 'kLR35YPZ%CDJ',
    username: 'user2'
  },
  {
    email: 'test3@email.com',
    password: '%Ux3^ARKTYCs',
    username: 'user3'
  },
  {
    email: 'test4@email.com',
    password: '#cv!u@!2@NXN',
    username: 'user4'
  },
  {
    email: 'test5@email.com',
    password: 'ph%vkEDrhDv9',
    username: 'user5'
  }
];

let index = 0;

/**
 * Reinitialise the user index
 */
module.exports.initIndex = () => {
  index = 0;
}

/**
 * Insert a user in the database
 * @param wantFull If true, return the MongoDB document; if false, return the initial object (password
 *                  not hashed)
 * @return The inserted user, according to wantFull param
 */
async function insertUser(wantFull) {
  let hashPassword;

  try {
    hashPassword = await argon2.hash(USERS[index].password);
  } catch (err) {
    console.log(`User${index} creation has failed (hash failure).`);
    console.log(err);

    throw err;
  }

  const fullUser = new User({
    email: USERS[index].email,
    password: hashPassword,
    username: USERS[index].username
  });

  try {
    await fullUser.save();
  } catch (err) {
    console.log(`User${index} creation has failed (insertion failure).`);
    console.log(err);

    throw err;
  }

  const insertedUser = USERS[index];

  index++;

  if (wantFull)
    return fullUser;

  return insertedUser;
}

module.exports.insertUser = insertUser;

/**
 * Give the current user
 * @returns The current user
 */
module.exports.currentUser = () => {
  return USERS[index];
}