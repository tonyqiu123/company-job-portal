const express = require('express')
const router = express.Router()
const { adminLogin } = require('../controllers/adminController')
const path = require('path');
const { adminAuth } = require('../middleware/adminAuthMiddleware');

router.post('/login', adminLogin)
router.get('/protected', adminAuth, (req, res) => {
    return res.status(200).json({ message: 'Access granted to protected route' });
});
module.exports = router 