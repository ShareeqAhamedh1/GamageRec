
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError');
const validateAdminCredentials = require('../validation/validateAdminCredentials');


exports.signup = async (req, res, next) => {
    try {
       
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return next(new createError('User already exists!', 400));
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            age: req.body.age,
            status: req.body.status
        });

        const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
                status: newUser.status
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};

exports.adminLogin = async (req, res, next) => {
    try {
        validateAdminCredentials(req, res, async () => {
            const token = req.adminToken;
            const users = await User.find({}, { password: 0 });

            res.status(200).json({
                status: 'success',
                message: 'Admin logged in successfully',
                token,
                users: users.map(user => ({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    age: user.age,
                    status: user.status
                })),
            });
        });
    } catch (error) {
        next(error);
    }
};


exports.edit = async (req, res, next) => {
    try {
            const users = await User.find({}, { password: 0 });

            const token = jwt.sign({ _id: users._id }, 'secretkey123', {
                expiresIn: '90d',
            });
    
            res.status(200).json({
                status: 'success',
                message: 'Logged in successfully',
                user: {
                    _id: users._id,
                    name: users.name,
                    email: users.email,
                    age: users.age,
                    status: users.status
                },
                token,
            });
    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new createError('Invalid email or password', 404));
        }

       
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(new createError('Invalid email or password', 401));
        }


        const token = jwt.sign({ _id: user._id }, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                status: user.status
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};
