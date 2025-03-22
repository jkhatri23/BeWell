const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, 'bewell_jwt_secret', {
        expiresIn: '30d'
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        console.log('Received registration request:', { ...req.body, password: '[REDACTED]' });
        
        const { name, email, password } = req.body;

        // Create new user without any validation
        console.log('Creating new user:', { name, email });
        const user = await User.create({
            name: name || 'Anonymous User',
            email: email || `user${Date.now()}@example.com`,
            password: password || 'defaultpassword123'
        });

        if (user) {
            console.log('User created successfully:', user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            console.log('Failed to create user');
            res.status(400).json({ message: 'Failed to create user' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ 
            message: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        console.log('Login attempt:', { ...req.body, password: '[REDACTED]' });
        let { email, password } = req.body;
        
        // Clean up email format by removing extra quotes if present
        email = email.replace(/^["']|["']$/g, '');

        // Find user by email (case-insensitive)
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log('Invalid password for user:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('Login successful for user:', email);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ 
            message: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// @desc    Upload a photo
// @route   POST /api/users/upload-photo
// @access  Private
const uploadPhoto = async (req, res) => {
    try {
        const { url, caption } = req.body;
        const user = await User.findById(req.user._id);

        if (user) {
            user.photos.push({
                url,
                caption
            });

            await user.save();
            res.json({ message: 'Photo uploaded successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    uploadPhoto
}; 