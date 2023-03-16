const express = require('express');
const router = express.Router();

// bcryptjs package for password hashing and encryption
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// import validators
const { body, validationResult } = require('express-validator');

// JSON Web Token to generate unique Token for user
const jwt = require('jsonwebtoken');
// Signature Key
const AUTH_KEY = "MYNameISRahul@6820";

const fetchuser = require('../middleware/fetchuser');

// Not using get method as we are sendig sensitive data
// router.get('/', (req, res) => {
//     console.log(req.body);
//     res.json({name:"Rahul Maurya", age: 21});
// });


// Create new User using POST: '/api/auth/createnewuser' endpoint : No Login Required
// Route 1: router.post(path, array of validators or without array both will work, callback(req, res));
router.post('/createuser',
    // body(fieldname, errorMsg)
    [body("name", "Enter Valid name").isLength({ min: 5 }),
    body("email", "Enter Correct Email").isEmail(),
    body("password", "Password must be of minimum 5 length").isLength({ min: 5 })],
    async (req, res) => {
        let success = false;

        console.log(req.body);
        // res.json({name:"Rahul Maurya", age: 21});

        // check for errors in input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        // One way of Creating instance
        // New instance of the user Schema
        // const user = User(req.body);
        // User instace stored and saved into Database
        // user.save();
        // res.json(user);

        // Secone way using promises
        // User.create({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password,
        // }).then(user => res.json(user)).catch(err => {
        //     console.log(err);
        //     res.json({error: "Email alredy Exists!!!!", message: err.message})
        // });

        try {
            //  Check if email is already registered or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "Email already Registered" });
            }

            // Encrypting the password
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            console.log(secPassword);
            
            // Third way of Creating user using asynchronous function
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            });
            
            
            // Generating new Token
            // Retrieving the unique id from database which is generated automatically by mongoDB
            const data = {
                user: {
                    id: user.id,
                }
            }

            // After successful registration authToken is generated and sended to user
            const authToken = jwt.sign(data, AUTH_KEY);
            // console.log(authToken);

            success = true;
            res.json({success, authToken});

            // Need to send response else the client would keep on waiting. Not needed when authToken is being sended
            // res.json(user);

            // Catch Error if bad requests occured
        } catch(err) {
            console.error(err.message);
            res.status(500).json({ success, error: "Internal Server Error" });
        }
    });


// User Login using POST: '/api/auth/login' endpoint : No Login Required
// Route 2: router.post(path, arra of validators or without array both will work, callback(req, res));
router.post('/login',
    // body(fieldname, errorMsg)
    [
    body("email", "Enter Correct Email").isEmail(),
    body("password", "Password Required").exists()],
    async (req, res) => {
        let success = false;

        // console.log(req.body);
        // check for errors in input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            const {email, password} = req.body;
            //  Check if email is already exists or not
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Please Login using correct Credentials" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ success, error: "Please Login using correct Credentials" });
            }

            // If Login Successful Generate new Token
            // Retrieving the unique id from database which is generated automatically by mongoDB
            const data = {
                user: {
                    id: user.id,
                }
            }

            // After successful login authToken is generated and sended to user
            const authToken = jwt.sign(data, AUTH_KEY);
            // console.log(authToken);

            success = true;
            res.json({ success, authToken });

            // Need to send response else the client would keep on waiting. Not needed when authToken is being sended
            // res.json(user);

            // Catch Error if bad requests occured
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    });



// Check Token using POST: '/api/auth/checkuser' endpoint : Login Required
// Route 3: router.post(path, array of validators or without array both will work, callback(req, res));
router.post('/checkuser', fetchuser,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    });

    
// Export the module
module.exports = router;