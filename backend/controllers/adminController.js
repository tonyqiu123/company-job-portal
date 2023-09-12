const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { Resend } = require("resend");

const resend = new Resend(process.env.resend_api);

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

const sendEmail = asyncHandler(async (req, res) => {
    try {

        const { role, applicantEmail } = req.body

        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'tonyqiu12345@gmail.com',
            subject: 'Hello World',
            html: `<h2>Congratulations! You\'ve been selected for an interview for ${role}</h2>`
        });
        console.log({ data })
        res.status(200).json({ message: "Success" })
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = {
    adminLogin,
    sendEmail
}