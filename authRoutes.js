const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Adjust the path as necessary
const authenticateJWT = require('../middleware/authenticateJWT'); // Correct the path

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authenticateJWT, authController.protectedRoute);

module.exports = router;
