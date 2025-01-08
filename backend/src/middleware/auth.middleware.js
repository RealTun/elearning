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
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

const checkRole = (role) => (req, res, next) => {
    // console.log(req.user);
    if (req.user.role !== role) {
      return res.status(403).send({message: 'Access denied'});
    }
    next();
  };

module.exports = {
    authenticateToken,
    checkRole
}
