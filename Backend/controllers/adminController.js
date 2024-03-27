const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.is_admin && await bcrypt.compare(password, user.password)) {
        const token = generateToken(user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            is_active: user.is_active,
            image_url: user.image_url,
            token
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

const getAdmin = asyncHandler(async (req, res) => {
    res.json(req.user);
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({ is_admin: false });
    res.status(200).json(users);
});

const blockUser = asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    user.is_active = !user.is_active;
    await user.save();

    const updatedUsers = await User.find({ is_admin: false });
    res.status(200).json(updatedUsers);
});

const addUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body.userData;

    if (!name || !email || !password) {
        res.status(400).json({ message: 'Enter valid data' });
        return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const users = await User.find({ isAdmin: false });

    res.status(201).json({ message: 'User created successfully', users });
});


const editUser = asyncHandler(async (req, res) => {
    const { id, name, email } = req.body.userData;

    const user = await User.findById(id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    user.name = name;
    user.email = email;
    await user.save();
    const updatedUsers = await User.find({ is_admin: false });
    res.status(200).json(updatedUsers);
});


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
    adminLogin,
    getAdmin,
    getUsers,
    blockUser,
    addUser,
    editUser
};
