/**
 * POST /registration endpoint callback
 * 
 * Register a user
 */

const argon2 = require('argon2'); // Library used for encrypting the password
const { validationResult } = require('express-validator');
const { User } = require('../model/schema/user');

/**
 * POST /registration endpoint callback
 * Register a user
 * @param req The request. The body must contains:
 *   - email: string, the user email
 *   - password: string, the hashed salted password
 *   - username:
 * @param res The response. 200 on success, 422 if invalid request, 401 if invalid credentials, 500 if internal error
 */
module.exports = async (req, res) => {
    /**
     * Check if validation has failed
     * 
     * Developped using https://express-validator.github.io/docs/index.html#basic-guide
     */
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Display the error in the API console
        console.log('POST /registration validation failed: sending 422 HTTP code...');
        console.log(errors.array());

        // Send back a 422 HTTP Error code (Unprocessable entity)
        return res.status(422).end();
    }

    try {
        // Search for the user before adding it to prevent duplicate email or username in the database
        const user = await User.find().or([
            { email: req.body.email },
            { username: req.body.username }
        ]);

        if (user.length >= 1) {
            // Return 409 HTTP error code if the email or the username is already used
            return res.status(409).end();
        } else {
            // Create a new user with a hash password
            const hash = await argon2.hash(req.body.password);

            const user = new User({
                email: req.body.email,
                password: hash,
                username: req.body.username
            });

            const result = await user.save();

            // Log the created user
            console.log(result);

            res.status(201).end();
        }
    } catch (err) {
        return res.status(500).end();
    }
};