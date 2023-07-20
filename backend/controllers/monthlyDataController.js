const asyncHandler = require('express-async-handler');
const monthlyData = require('../models/monthlyDataModel');
const mongoose = require('mongoose');

const getMonthlyData = asyncHandler(async (req, res) => {
    try {
        const query = {  }
        const data = await monthlyData.find()
        res.status(200).json(data)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.toString() });
    }
})

module.exports = {
    getMonthlyData
};
