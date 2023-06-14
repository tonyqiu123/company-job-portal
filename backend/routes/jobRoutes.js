const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/adminAuthMiddleware');
const { getJobs, getSingleJobData, createJob, updateJob, deleteJobs } = require('../controllers/jobController');

router.get('/:id', getSingleJobData);
router.get('/', getJobs);
router.post('/', adminAuth, createJob);
router.put('/:id', adminAuth, updateJob);
router.delete('/', adminAuth, deleteJobs); // Add this line for deleting multiple jobs

module.exports = router;
