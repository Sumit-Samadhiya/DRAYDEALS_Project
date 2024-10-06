const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin Authentication Routes
router.post('/login', adminController.loginAdmin);

// Register a new Admin (use this once to create an admin)
router.post('/register', adminController.registerAdmin);

module.exports = router;
