const express = require("express");
const jwt = require("jsonwebtoken");  // to Generate authentication tokens
const User = require("../models/User"); // Mongoose User model
require("dotenv").config();

const router = express.Router();

// User Signup Route   (POST http://localhost:3000/api/signup)
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if username already exists
        const userName = await User.findOne({ username });
        if (userName) return res.status(400).json({ message: "This Username is not available" });

        // Check if email already exists
        const user = await User.findOne({ email });
        if (user) return res.status(404).json({ message: "User already exists" });

        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: 'New User added successfully', id: newUser.id, token });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;