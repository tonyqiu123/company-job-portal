// controllers/dataAggregator.js

const mongoose = require('mongoose');
const Job = require('../models/jobModel'); // Assume this is your Job model
const User = require('../models/userModel'); // Assuming this is your User model
const MonthlyData = require('../models/monthlyDataModel');

const aggregateMonthlyData = async () => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' }); // get the full name of the month
  const year = currentDate.getFullYear();

  const jobs = await Job.find({ created: { $gte: new Date(year, currentDate.getMonth(), 1), $lte: currentDate } });

  const activeJobs = jobs.length;

  let applications = 0;
  let views = 0;
  for (let job of jobs) {
    applications += job.applicants.length;
    views += job.views;
  }

  const jobsPosted = await Job.countDocuments({ created: { $gte: new Date(year, currentDate.getMonth(), 1), $lte: currentDate } });

  const signups = await User.countDocuments({ date: { $gte: new Date(year, currentDate.getMonth(), 1), $lte: currentDate } });

  // Check for edge case where views are zero
  const applicationRate = views !== 0 ? (applications / views) * 100 : 0;

  const newMonthlyData = new MonthlyData({
    month,
    year,
    applications,
    signups,
    jobsPosted,
    activeJobs,
    views,
    applicationRate
  });

  await newMonthlyData.save();
};

module.exports = aggregateMonthlyData;
