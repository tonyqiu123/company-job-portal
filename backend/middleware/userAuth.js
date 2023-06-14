const jwt = require('jsonwebtoken')

function generateToken(payload, secret) {
    return jwt.sign(payload,secret)
}

module.exports = {jwt} 