const express = require("express");
const jwt = require("jsonwebtoken"); // to Generate authentication tokens
const bcrypt = require("bcryptjs");  // to Hash user passwords securely
const User = require("../models/User"); // Mongoose User model
require("dotenv").config();

const router = express.Router();

// User Login Route  (POST http://localhost:3000/api/login)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        //find the user by his email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);       //user is from found user by email hence user.password
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;