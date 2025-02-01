const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/connect');
const contactModel = require('./models/contactModel');
const nodemailer = require('nodemailer');
const emailRouter = require('./routes/emailRoutes');
const contactRouter = require('./routes/contactRoutes');
const jobRouter = require('./routes/jobRoutes');
const adminRouter = require('./routes/adminRoutes');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(cors({
    origin: ['http://musttechsolutions.com', 'https://musttechsolutions.com']
}));



connectDB();



// API route to handle form submission
app.use('/uploads', express.static('uploads')); // Serve uploaded files

app.use('/api', emailRouter);
// API route to handle form submission
app.use('/api/contact', contactRouter);
// API route to handle form submission
app.use('/api/job', jobRouter);
// API route to handle form submission
app.use('/api/admin', adminRouter);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
