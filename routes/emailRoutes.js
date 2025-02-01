// routes/emailRoutes.js
const express = require('express');
const { sendEmail } = require('../controllers/applyJobController');
const upload = require('../utils/multerConfig');

const emailRouter = express.Router();

emailRouter.post('/apply-job', upload.single('cv'), sendEmail);

module.exports = emailRouter;