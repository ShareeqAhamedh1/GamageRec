const jwt = require('jsonwebtoken');
const createError = require('../utils/appError');

// Function to validate admin credentials
const validateAdminCredentials = (req, res, next) => {
    const adminEmail = "admin@gmail.com"; // Change this to your admin email
    const adminPassword = "admin123"; // Change this to your admin password

    // Check if provided credentials match admin credentials
    if (req.body.email === adminEmail && req.body.password === adminPassword) {
        // Generate JWT token for admin
        const token = jwt.sign({ email: adminEmail }, 'adminSecretKey', {
            expiresIn: '90d',
        });
        // Attach the token to the request object for further use
        req.adminToken = token;
        next();
    } else {
        // If credentials do not match, return an error
        next(new createError('Invalid admin credentials', 401));
    }
};

module.exports = validateAdminCredentials;
