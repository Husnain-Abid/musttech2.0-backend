const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel.');

// @desc Admin login
// @route POST /api/admin/login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc Protected dashboard
// @route GET /api/admin/dashboard
const getAdminDashboard = async (req, res) => {
    res.json({ message: `Welcome to the admin dashboard`, admin: req.admin });
};

// @desc Register a new Admin (Temporary Route)
// @route POST /api/admin/register
const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create new Admin
        const newAdmin = new adminModel({
            email,
            password, // Password will be hashed in the Admin model pre-save hook
        });

        await newAdmin.save();

        // Generate a token
        const token = jwt.sign({ id: newAdmin._id, email: newAdmin.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                id: newAdmin._id,
                email: newAdmin.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    loginAdmin,
    getAdminDashboard,
    registerAdmin
};
