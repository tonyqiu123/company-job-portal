const express = require('express');
const router = express.Router();
const { getMonthlyData } = require('../controllers/monthlyDataController');
 
router.get('/', getMonthlyData);

module.exports = router;
