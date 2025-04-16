const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');

// Use the same secret key as in UserController for consistency
const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key';

/**
 * Middleware to verify JWT token
 * Extracts the token from Authorization header
 * Decodes the token and attaches user info to request
 */
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

/**
 * Role-based access control middleware
 * @param {Array} roles - Array of allowed roles for this route 
 * Example usage: checkRole(['Admin']) - only Admin can access
 * Example usage: checkRole(['Admin', 'ServiceProvider']) - both Admin and ServiceProvider can access
 * Example usage: checkRole(['Customer', 'ServiceProvider', 'Admin']) - all roles can access
 */
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: 'Access denied. Insufficient permissions.' 
            });
        }

        next();
    };
};

module.exports = {
    verifyToken,
    checkRole
}; 