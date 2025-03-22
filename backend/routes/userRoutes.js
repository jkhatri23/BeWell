const express = require('express');
const router = express.Router();
const { registerUser, loginUser, uploadPhoto } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload-photo', protect, uploadPhoto);

module.exports = router; 