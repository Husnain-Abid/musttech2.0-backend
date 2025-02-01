const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    message: String,
},{timestamps:true});

const contactModel = mongoose.model('Contact', contactSchema);

module.exports = contactModel;