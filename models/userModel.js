const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true // Ensures email is unique, separate error handling for uniqueness
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
