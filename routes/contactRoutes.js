// routes/emailRoutes.js
const express = require('express');
const {submitContactForm, getAllContacts, deleteContact, getContact} = require('../controllers/contactController');
const protect = require('../utils/authMiddleware');

const contactRouter = express.Router();

contactRouter.post('/post', submitContactForm);

contactRouter.get('/get', protect, getAllContacts); // Fetch all contacts

contactRouter.get('/get/:id', protect, getContact); // Fetch single contact by ID

contactRouter.delete('/delete/:id', protect, deleteContact); 


module.exports = contactRouter;
