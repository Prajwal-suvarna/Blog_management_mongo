const express = require('express');
const router = express.Router();
const authController = require('../controller/authorController');

// Signup route
router.post('/signup', authController.signup);

// Signin route
router.post('/signin', authController.signin);

// Protected route example
router.get('/protected', authController.protectedRoute);

module.exports = router;
