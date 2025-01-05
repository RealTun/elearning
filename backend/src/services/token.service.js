'use strict'

const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

// Tạo token
const generateToken = async (user) => {
    const payload = {
        username: user.username,
        password: user.password,
        role: user.role
    };
    
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: '3h',
    });

    return token;
}

module.exports = {
    generateToken
}
