const express = require('express');
const protect = require('../utils/authMiddleware');
const { loginAdmin, getAdminDashboard, registerAdmin } = require('../controllers/adminController');
const adminRouter = express.Router();

// Admin login route
adminRouter.post('/login', loginAdmin);

// Protected route for dashboard
adminRouter.get('/', protect, getAdminDashboard);

// Admin registration route (temporary, remove after registering)
// adminRouter.post('/register', registerAdmin);

module.exports = adminRouter;
