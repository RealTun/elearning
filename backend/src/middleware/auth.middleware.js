'use strict'

const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Xác thực token
        req.user = decoded; // Gắn thông tin user vào req
        next(); // Chuyển sang middleware tiếp theo
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    authenticateToken
}
