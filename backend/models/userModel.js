const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attachmentSchema = new Schema({
    _id: String,
    fileType: {
        type: String,
        enum: ['Resume', 'Coverletter', 'References', 'Portfolio', 'Certificates']
    }
});

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        location: { type: String, default: "" },
        phone: { type: String, default: "" },
        urls: { type: [String], default: [] },
        attachments: { type: [attachmentSchema], default: [] },
        date: { type: Date, default: Date.now },
        appliedJobs: { type: [String], default: [] },
        shortlisted: { type: [String], default: [] }, 
    },
    { timestamps: true }
);

userSchema.index({ firstName: 'text', lastName: 'text', email: 'text' }); // Indexing firstName and lastName fields

const User = mongoose.model('User', userSchema);
module.exports = User;
