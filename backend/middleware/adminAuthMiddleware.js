const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    // check for the presence of the JWT in the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    // verify the JWT
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    // proceed to the next middleware/route handler
    next();
}

module.exports = {
    adminAuth
}