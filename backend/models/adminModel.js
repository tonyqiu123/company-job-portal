const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    twoFactorEnabled: { type: Boolean, default: false },
    lastLoginDate: { type: Date, default: Date.now }
});


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
