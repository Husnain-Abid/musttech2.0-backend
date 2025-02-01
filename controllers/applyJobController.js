// controllers/emailController.js
const nodemailer = require('nodemailer');
const path = require('path');
const Email = require('../models/emailModel');

const sendEmail = async (req, res) => {
    const { name, email, city } = req.body;
    const cvFile = req.file;

    const emailData = new Email(name, email, city, cvFile);

    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "nainiphp603@gmail.com",
        subject: 'Job Application',
        text: `Name: ${emailData.name}\nEmail: ${emailData.email}\nCity: ${emailData.city}`,
        attachments: [
            {
                filename: cvFile.originalname,
                path: cvFile.path,
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('application sent successfully');
    } catch (error) {
        res.status(500).send('Error sending: ' + error.toString());
    }
};

module.exports = { sendEmail };