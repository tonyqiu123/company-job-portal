const express = require('express')
const router = express.Router()
const { adminLogin } = require('../controllers/adminController')
const path = require('path');

router.post('/login', adminLogin)

module.exports = router 