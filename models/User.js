// Stores user details (username, email, password).
const mongoose = require("mongoose");  // MongoDB ORM for defining schemas
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });   //automatically adds createdAt and updatedAt fields

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Prevent rehashing
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("User", userSchema);