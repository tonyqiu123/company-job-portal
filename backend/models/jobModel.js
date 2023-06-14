const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number },
  position: { type: String, enum: ['Full Time', 'Part Time', 'Contract', 'Internship'], default: 'Full Time' },
  requirements: { type: [String], default: [] },
  responsibilities: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  whatWereLookingFor: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
  deadline: { type: Date, default: getDefaultDeadline },
  remote: { type: Boolean, default: false },
  benefits: { type: [String], default: [] },
  applicants: { type: [String], default: [] },
  requiredDocuments: { type: [String], enum: ['resume', 'coverletter', 'references', 'portfolio', 'certificates'], default: ['Resume'] },
  jobQuestions: { type: [String], default: [] },
  yoe: { type: Number, default: 3 }
});

jobSchema.index({ title: 'text' });

function getDefaultDeadline() {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 90);
  return deadline;
}

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
