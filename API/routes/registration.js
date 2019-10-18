// //import the library for encrypt the password
// const argon2 = require('argon2');
// const { validationResult } = require('express-validator');

// // import the user model
// const { User } = require('../model/schema/user');

// // create the user realted routers
// // the signup route for the user creation
// module.exports = (req, res) => {
//   /**
//    * Check if validation has failed
//    * 
//    * Developped using https://express-validator.github.io/docs/index.html#basic-guide
//    */
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     // Display the error in the API console
//     console.log('POST /registration validation failed : sending 422 HTTP code...');

//     // Send back a 422 HTTP Error code (Unprocessable entity)
//     return res.status(422).json({ errors: errors.array() });
//   }

//   //seacrh for the user before add it to prevent the duplicate email in the database
//   User.find().or([
//     { email: req.body.email },
//     { username: req.body.username }
//   ])
//     .exec()
//     .then(user => {
//       // issue if the user exists before
//       if (user.length >= 1) { //check the array lentgh of the email address if we already have it in the database
//         //409 means conflicts user already exist in the database;
//         return res.status(409).end();
//       } else {
//         // create a new user with a hash password
//         argon2.hash(req.body.password)
//           .then((hash) => {
//             // no error have a hash password and we store it in the database
//             const user = new User({
//               email: req.body.email,
//               password: hash,
//               username: req.body.username
//             });// hash the password with the bcrypt library
//             user.save()
//               .then(result => {
//                 console.log(result);// log the created user
//                 res.status(201).end();
//               })
//               .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                   error: err
//                 });
//               }); // if there is error catch it
//           })
//           .catch(err => {
//             return res.status(500).json({
//               error: err // failed we dont have password
//             });
//           });
//       }
//     });
// };



//import the library for encrypt the password
const argon2 = require('argon2');
const { validationResult } = require('express-validator');

// import the user model
const { User } = require('../model/schema/user');

// create the user realted routers
// the signup route for the user creation
module.exports = async (req, res) => {
    /**
     * Check if validation has failed
     * 
     * Developped using https://express-validator.github.io/docs/index.html#basic-guide
     * developed usig https://github.com/github/fetch#post-form
     */
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Display the error in the API console
        console.log('POST /registration validation failed : sending 422 HTTP code...');

        // Send back a 422 HTTP Error code (Unprocessable entity)
        return res.status(422).json({ errors: errors.array() });
    }
    // The request has been validated and can be processed
    console.log(`POST /login (email: ${req.body.email})`);
    try {
        //seacrh for the user before add it to prevent the duplicate email in the database
        const user = await findUser(user).or([
            { email: req.body.email },
            { username: req.body.username }
        ]);
        res.end();
    } catch (err) {
        // Check the caught error
        switch (err.name) {
            case CredentialsMismatchError.name:
                // The login has failed because of a credentials mismatch
                console.log(`Connection failure : credentials mismatch (email: ${req.body.email})...`);

                // Send Unauthorized 401 HTTP code
                res.status(401).end();
                break;
            default:
                // The login has failed for an other reason (e.g. DB access failure, ...)
                console.log(`Connection failure : internal error (email: ${req.body.email})...`);

                // Send Internal Server Error 500 Error HTTP code
                res.status(500).end();
                break;
        }
    }
};



async function findUser(user) {
    try {
        // issue if the user exists before
        if (user.length >= 1) { //check the array lentgh of the email address if we already have it in the database
            //409 means conflicts user already exist in the database;
            return res.status(409).end();
        } else {

            // create a new user with a hash password
            const password = await (argon2.hash(req.body.password))
            // .then((hash) => {
            // no error have a hash password and we store it in the database
            const user = await new User({
                email: req.body.email,
                password: hash,
                username: req.body.username
            });// hash the password with the bcrypt library
            user.save()
                .then(result => {
                    console.log(result);// log the created user
                    res.status(201).end();
                })
        }
    } catch (err) {
        // Propagate the error
        throw err;
    }

}