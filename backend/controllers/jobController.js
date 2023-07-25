const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');
const mongoose = require('mongoose');

const applyJob = asyncHandler(async (req, res) => {
  try {
    const { userId, action } = req.body;
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (action === 'apply') {
      job.applicants.push(userId);
    } else if (action === 'unapply') {
      job.applicants = job.applicants.filter(id => id !== userId);
    } else if (action !== 'shortlist' && action !== 'unshortlist') {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await job.save(); // Save the modified job object

    return res.status(200).json({ message: 'success' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.toString() });
  }

});



const getJobs = asyncHandler(async (req, res) => {
  const { jobIds, search, position } = req.body;

  let query = {};

  if (jobIds.length > 0) {
    if (!Array.isArray(jobIds) || jobIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      res.status(400);
      throw new Error('Invalid Job IDs');
    }

    query = { _id: { $in: jobIds } };

    // If there's only one jobId in the array, increment the 'views' for that job
    if (jobIds.length === 1) {
      const job = await Job.findById(jobIds[0]);
      if (job) {
        job.views += 1;
        await job.save();
      }
    }
  }

  if (search) {
    query.$text = { $search: search };
  }

  if (position) {
    query.position = position
  }

  const selectFields = [];

  const properties = [
    'title',
    'location',
    'description',
    'salary',
    'position',
    'requirements',
    'responsibilities',
    'skills',
    'whatWereLookingFor',
    'date',
    'deadline',
    'remote',
    'benefits',
    'applicants',
    'requiredDocuments',
    'jobQuestions',
    'yoe',
    'views'
  ];

  properties.forEach((field) => {
    if (req.query[field]) {
      selectFields.push(field);
    }
  });

  const jobs = await Job.find(query).select(selectFields.join(' '));

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
    position: req.body.position || 'Full Time',
    requirements: req.body.requirements || [],
    responsibilities: req.body.responsibilities || [],
    skills: req.body.skills || [],
    whatWereLookingFor: req.body.whatWereLookingFor || [],
    created: req.body.created || Date.now(),
    deadline: req.body.deadline || getDefaultDeadline(),
    remote: req.body.remote || false,
    benefits: req.body.benefits || [],
    applicants: req.body.applicants || [],
    selected: req.body.selected || [],
    selectedForInterview: req.body.selectedForInterview || [],
    shortlisted: req.body.shortlisted || [],
    rejected: req.body.rejected || [],
    requiredDocuments: req.body.requiredDocuments || [],
    jobQuestions: req.body.jobQuestions || [],
    views: req.body.views || 0,
    yoe: req.body.yoe || 3,
  });

  res.status(201).json(job);
});

function getDefaultDeadline() {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 90);
  return deadline;
}

module.exports = createJob;



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

const applyToJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user.id; // Assuming the user ID is available in the request after JWT validation

  // Check if the job ID is valid
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    res.status(400).json({ message: 'Invalid Job ID' });
    return;
  }

  try {
    const job = await Job.findById(jobId);

    // Check if the job exists
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    // Check if the user has already applied to the job
    const hasApplied = job.applicants.includes(userId);

    if (hasApplied) {
      // User has already applied, remove their ID from applicants
      job.applicants = job.applicants.filter((applicantId) => applicantId !== userId);
      await job.save();

      res.status(200).json({ message: 'Application removed successfully' });
    } else {
      // User has not applied, add their ID to applicants
      job.applicants.push(userId);
      await job.save();

      res.status(200).json({ message: 'Application submitted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = {
  applyJob,
  getJobs,
  createJob,
  updateJob,
  deleteJobs,
};
