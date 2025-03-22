const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
        index: false
    },
    email: {
        type: String,
        required: false,
        unique: false,
        index: false
    },
    password: {
        type: String,
        required: false,
        index: false
    },
    photos: [{
        url: String,
        caption: String,
        dateUploaded: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Remove any existing indexes
userSchema.index({}, { unique: false });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to check if password matches
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Drop any existing indexes
User.collection.dropIndexes().catch(err => {
    if (err.code !== 26) { // Ignore error if collection doesn't exist
        console.error('Error dropping indexes:', err);
    }
});

module.exports = User; 