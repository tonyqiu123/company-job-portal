const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const adminLogin = asyncHandler(async (req, res) => {
    if (req.body.password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({
            data: 'admin'
        }, process.env.JWT_SECRET, { expiresIn: '30d' })

        res.json({ token })
    } else {
        res.status(401).json({ message: "Incorrect password" })
    }
});


module.exports = {
    adminLogin
}

