const contactModel = require('../models/contactModel');
const nodemailer = require('nodemailer');

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables for sensitive data
        pass: process.env.EMAIL_PASS
    }
});


const submitContactForm = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, message, subject } = req.body;

        // Configure email options
        const mailOptions = {
            from: email,
            // to: 'armash.ata@gmail.com', // Replace with your email address
            to: 'nainiphp603@gmail.com', // Replace with your email address
            subject: 'New Contact Form Submission',
            text: `You have a new contact form submission:\n\n
                Name: ${firstName} ${lastName}\n
                Email: ${email}\n
                Phone Number: ${phoneNumber}\n
                Subject: ${subject}\n
                Message: ${message}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Save contact information to the database
        const contact = new contactModel({ firstName, lastName, email, phoneNumber, subject, message });
        await contact.save();

        // Respond with success
        res.status(200).json({ message: 'We appreciate your message! Our team will get back to you soon.' });

    } catch (error) {
        res.status(500).json({ message: 'Form submission failed', error });
        console.log(error);
    }

};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find();

        if (contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts found' });
        }

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contacts', error });
        console.log(error);
    }
};

const getContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await contactModel.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contact', error });
        console.log(error);
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await contactModel.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete contact', error });
        console.log(error);
    }
};



module.exports = { submitContactForm, getAllContacts, deleteContact, getContact};