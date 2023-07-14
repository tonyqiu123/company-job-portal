const mongoose = require('mongoose');
const { Schema } = mongoose;

const monthlyDataSchema = new Schema({
    month: { type: String, required: true },
    year: { type: Number, required: true },
    applications: { type: Number, required: true },
    signups: { type: Number, required: true },
    jobsPosted: { type: Number, required: true },
    activeJobs: { type: Number, required: true },
    views: { type: Number, required: true },
    applicationRate: { type: Number, required: true },
});

const MonthlyTotal = mongoose.model('MonthlyTotal', monthlyDataSchema);
module.exports = MonthlyTotal;
