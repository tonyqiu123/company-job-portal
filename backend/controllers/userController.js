const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const getUsers = asyncHandler(async (req, res) => {
    const { userIds, search } = req.body;

    let query = {};

    if (search) {
        query.$text = { $search: search };
    }

    if (status) {
        query.status = status
    }

    const selectFields = [];

    const properties = [
        'firstName',
        'lastName',
        'email',
        'location',
        'phone',
        'urls',
        'attachments',
        'date',
        'appliedJobs',
        'shortlisted',
        'jobQuestionResponse',
        'description',
        'responsibilities',
        'whatWereLookingFor',
        'benefits',
        'requirements',
    ];

    properties.forEach((field) => {
        if (req.query[field]) {
            selectFields.push(field);
        }
    });

    const users = await User.find(query).select(selectFields.join(' ')).select('-password');

    res.status(200).json(users);
});


const getUsersById = asyncHandler(async (req, res) => {
    const { userIds, search } = req.body;

    let query = {};

    if (userIds.length > 0) {
        if (!Array.isArray(userIds) || userIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
            res.status(400);
            throw new Error('Invalid Job IDs');
        }

        query = { _id: { $in: userIds } };
    } else {
        res.status(200).json([]);
        return;
    }

    if (search) {
        query.$text = { $search: search };
    }

    const selectFields = [];

    const properties = [
        'firstName',
        'lastName',
        'email',
        'location',
        'phone',
        'urls',
        'attachments',
        'date',
        'appliedJobs',
        'shortlisted',
        'jobQuestionResponse',
        'description',
        'responsibilities',
        'whatWereLookingFor',
        'benefits',
        'requirements',
    ];

    properties.forEach((field) => {
        if (req.query[field]) {
            selectFields.push(field);
        }
    });

    const users = await User.find(query).select(selectFields.join(' ')).select('-password');

    res.status(200).json(users);
});


const getSingleUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
});


const createUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) || !firstName || !lastName || !email) {
        res.status(400)
        throw new Error('Missing firstName, lastName, email, or password')
    }
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('Email already in use')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: `User ${userId} not found` });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
        });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: 'Error updating user', error: err.message });
    }
});



const deleteUser = asyncHandler(async (req, res) => {

    const userId = req.user._id

    const user = await User.findById(userId) 

    if (!user)
        res.status(400).json({ message: `User ${userId} not found` })

    await user.remove()

    res.status(200).json({ message: `Deleted user ${userId}` })
})

const uploadFile = asyncHandler(async (req, res) => {
    const fileName = req.file.filename
    res.status(200).json({ fileName });
})


// Generating JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    getSingleUser, getUsers, getUsersById, createUser, updateUser, deleteUser, loginUser, uploadFile
}