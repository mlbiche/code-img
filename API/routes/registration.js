//import the library for encrypt the password
const argon2 = require('argon2');

// import the user model
const User = require('../models/user');

// create the user realted routers
// the signup route for the user creation
module.exports = (req, res) => {
    //seacrh for the user before add it to prevent the duplicate email in the database
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            // issue if the user exists before
            if (user.length >= 1) { //check the array lentgh of the email address if we already have it in the database
                return res.status(409).json({//409 means conflicts user already existe in the database
                    message: 'Email already exists in the database'
                });
            } else {
                // create a new user with a hash password
                argon2.hash(req.body.password)
                    .then((hash) => {
                        // no error have a hash password and we store it in the database
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                            username: req.body.username
                        });// hash the password with the bcrypt library
                        user.save()
                            .then(result => {
                                console.log(result);// log the created user
                                res.status(201).json({
                                    message: 'User created successfully'//success create user
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            }); // if there is error catch it
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: err // failed we dont have password
                        });
                    });
            }
        });
}
