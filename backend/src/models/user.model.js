const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['free_user', 'paid_user', 'admin'],
        default: 'free_user',
    },
    full_name: {
        type: String,
        required: true,
        trim: true,
    },
    date_of_birth: {
        type: Date,
        required: false,
    },
    major: {
        type: String,
        required: false,
    },
    class: {
        type: String,
        required: false,
    },
    gpa: {
        type: Number,
        min: 0,
        max: 4,
        required: false,
    },
    study_schedule: {
        type: Object,
        default: {},
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
