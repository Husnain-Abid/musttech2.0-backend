const jobModel = require('../models/jobModel');

// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find(); // Fetch all jobs from the database
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs', error });
    }
};

// Get a specific job by slug
const getJobBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const job = await jobModel.findOne({ slug });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch the job', error });
    }
};

// Create a new job (POST)
const createJob = async (req, res) => {
    try {
        const { title, location, description, responsibilities, requirements, experience } = req.body;

        // Generate slug from the title
        const generateSlug = (title) => {
            return title
                .toLowerCase() // Convert to lowercase
                .replace(/[^a-z0-9 ]/g, '') // Remove non-alphanumeric characters (except spaces)
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .trim(); // Trim extra spaces
        };

        const slug = generateSlug(title);


        // Split responsibilities and requirements by newlines into an array
        const responsibilitiesArray = responsibilities.split('\n').filter(line => line.trim() !== '');
        const requirementsArray = requirements.split('\n').filter(line => line.trim() !== '');

        // Create a new job object
        const newJob = new jobModel({
            title,
            slug,
            location,
            description,
            responsibilities: responsibilitiesArray,
            requirements: requirementsArray,
            experience
        });


        // Save the job to the database
        await newJob.save();

        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create job', error });
    }
};

// Update an existing job by slug (PUT)
const updateJob = async (req, res) => {
    try {
        const { slug } = req.params;
        const updates = req.body;

        // Generate slug from the title
        const generateSlug = (title) => {
            return title
                .toLowerCase() // Convert to lowercase
                .replace(/[^a-z0-9 ]/g, '') // Remove non-alphanumeric characters (except spaces)
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .trim(); // Trim extra spaces
        };

        if (updates.title) {
            updates.slug = generateSlug(updates.title);
        }

        // Split responsibilities and requirements by newlines into an array (if they exist in the updates)
        if (updates.responsibilities) {
            updates.responsibilities = updates.responsibilities.split('\n').filter(line => line.trim() !== '');
        }
        if (updates.requirements) {
            updates.requirements = updates.requirements.split('\n').filter(line => line.trim() !== '');
        }

        // Find the job by slug and update it
        const updatedJob = await jobModel.findOneAndUpdate({ slug }, updates, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update job', error });
    }
};


// Delete a job by slug (DELETE)
const deleteJob = async (req, res) => {
    try {
        const { slug } = req.params;

        // Find the job by slug and delete it
        const deletedJob = await jobModel.findOneAndDelete({ slug });

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete job', error });
    }
};

module.exports = {
    getAllJobs,
    getJobBySlug,
    createJob,
    updateJob,
    deleteJob
};
