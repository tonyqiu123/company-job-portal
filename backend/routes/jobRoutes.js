const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuthMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { applyJob, getJobs, createJob, updateJob, deleteJobs } = require('../controllers/jobController');
 
router.put('/', getJobs);
router.post('/', adminAuth, createJob);
router.put('/:id', adminAuth, updateJob);
router.put('/apply/:id', protect, applyJob);
router.delete('/', adminAuth, deleteJobs); 

module.exports = router;
