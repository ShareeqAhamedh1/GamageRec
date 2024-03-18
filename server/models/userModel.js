const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    age: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
