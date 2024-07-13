const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


// @desc Register the user
// @route POST /api/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user with the same email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // 10 is the no. of salt rounds it will undergo
    console.log(hashedPassword)

    // after the password is hashed we can store the created user in the database
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    console.log(`User created : ${user}`)


    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(404).json('User data is not valid')
    }


    res.json({ message: "User is registered" })

});

// @desc Login the user
// @route POST /api/login
// @access public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {

        const accessToken = jwt.sign({

            // payload
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }

        },
            // after the payload we need to add a access token secret
            process.env.ACCESS_TOKEN_SECRET,

            // and finally then we need to add the expiration time for the token
            { expiresIn: '15m' }

        )
        res.status(200).json({ accessToken });

    } else {
        res.status(400).json('Invalid credentials')

    }

});

// @desc Get current info the user
// @route GET /api/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
    // the above is valid because in the validateTokenHandler the req.user is appended by the decodedInfo.user
    // so as a response we will get the current user
});

module.exports = { registerUser, loginUser, currentUser }


