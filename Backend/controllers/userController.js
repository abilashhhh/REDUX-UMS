const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body)

    // validation : 
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Checking if the user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Creating the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            is_active: user.is_active,
            image_url: user.image_url,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

})

// @desc Login / Authenticate user
// @route POST /api/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user.is_active) {
        res.status(400)
        throw new Error('User is blocked by admin, Cant login')
    }

    if (user.is_admin) {
        res.status(400)
        throw new Error('Admins should login using admins page')
    }


    // Check for user email
    // user.password is the hashed password
    if (user && await (bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            is_active: user.is_active,
            image_url: user.image_url,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }

})

// Profile updates


const updateUser = asyncHandler(async (req, res) => {
    const { id, email, name } = req.body.userData;

    if (!email && !name) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== id) {
            res.status(401);
            throw new Error('Email already exists. Please try a different email.');
        }
    }

    let updateFields = {};
    if (email) {
        updateFields.email = email;
    }
    if (name) {
        updateFields.name = name;
    }

    const user = await User.findByIdAndUpdate(id, updateFields, { new: true });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(user);
});


const updateProfileImage = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { id, imageUrl } = req.body.userData
    const user = await User.findByIdAndUpdate(id, { image_url: imageUrl }, { new: true })
    if (!user) {
        res.status(400)
        throw new Error('No new data have been updated')
    }
    res.status(200).json(user)
})




// @desc Get user data
// @route GET /api/users/me
// @access Private

// const getMe = asyncHandler(async (req, res) => {
//     const { _id, name, email } = await User.findById(req.user.id)
//     res.status(200).json({
//         id: _id ,
//         name,
//         email
//     })
// })

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, // 1 - the data we want to put in
        process.env.JWT_SECRET, // 2 - secret from env
        { expiresIn: '30d' } // 3 - expiring in 30 days
    )
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    updateProfileImage
}