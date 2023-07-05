const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // verify the JWT
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.data !== 'admin') {
                return res.status(401).json({ message: 'Not admin' });
            }
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
};

module.exports = {
    adminAuth
};
