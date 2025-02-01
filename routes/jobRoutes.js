const express = require('express');
const jobRouter = express.Router();
const { getAllJobs, getJobBySlug, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const protect = require('../utils/authMiddleware');

// Job routes
jobRouter.get('/get', getAllJobs);          // Get all jobs
jobRouter.get('/get/:slug', getJobBySlug);  // Get a job by slug
jobRouter.post('/post', protect, createJob);          // Create a new job
jobRouter.put('/update/:slug', protect, updateJob);     // Update a job by slug
jobRouter.delete('/delete/:slug', protect, deleteJob);  // Delete a job by slug

module.exports = jobRouter;
