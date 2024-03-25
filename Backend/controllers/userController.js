const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler((req, res) => {
    res.json({ message: "Register user" })
})

// @desc Login / Authenticate user
// @route POST /api/login
// @access Public

const loginUser = asyncHandler((req, res) => {
    res.json({ message: "Login user" })
})

// @desc Get user data
// @route GET /api/users/me
// @access Public

const getMe = asyncHandler((req, res) => {
    res.json({ message: "User data display" })
})  

module.exports = {
    registerUser,
    loginUser,
    getMe
}