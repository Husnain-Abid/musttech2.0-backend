const mongoose = require('mongoose');

require('dotenv').config(); // Load environment variables from .env file

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.error('DB connect successfully');
    } catch (err) {
        console.error('Could not connect to MongoDB', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
