const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String},
    location: { type: String, default: 'Lahore, Pakistan' },
    description: { type: String},
    responsibilities: [String],
    requirements: [String],
    experience: { type: String, required: true }
}, { timestamps: true });

const jobModel = mongoose.model('Job', jobSchema);

module.exports = jobModel;
