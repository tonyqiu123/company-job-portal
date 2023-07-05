const mongoose = require('mongoose');
const { Schema } = mongoose;


const monthlyTotalSchema = new Schema({
    month: String,
    year: Number,
    applications: Number,
    signups: Number,
    jobsPosted: Number,
    activeJobs: Number,
    views: Number,
    applicationRate: Number,
});

const MonthlyTotal = mongoose.model('MonthlyTotal', monthlyTotalSchema);
module.exports = MonthlyTotal;
