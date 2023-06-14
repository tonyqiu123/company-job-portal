const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');

const getSingleJobData = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  res.status(200).json(job);
});

const getJobs = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  if (req.query.position) {
    query.position = req.query.position;
  }

  const jobs = await Job.find(query).select('-description -responsibilities -whatWereLookingFor -benefits -requirements');

  res.status(200).json(jobs);
});

const createJob = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.location || !req.body.description) {
    res.status(400);
    throw new Error('Missing title, location, or description field');
  }

  const job = await Job.create({
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    salary: req.body.salary,
    requirements: req.body.requirements,
  });

  res.status(200).json(job);
});

const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(400).json({ message: `Job ${req.params.id} not found` });
    return;
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    res.status(400).json({ message: 'Bad request, improper types for field' });
  } else {
    res.status(200).json(updatedJob);
  }
});


const deleteJobs = asyncHandler(async (req, res) => {
  const { jobIds } = req.body;

  if (!Array.isArray(jobIds)) {
    res.status(400).json({ message: 'Job IDs must be provided as an array' });
    return;
  }

  const deletedJobs = await Job.deleteMany({ _id: { $in: jobIds } });

  res.status(200).json({ deletedCount: deletedJobs.deletedCount });
});

module.exports = {
  getSingleJobData,
  getJobs,
  createJob,
  updateJob, 
  deleteJobs,
};
