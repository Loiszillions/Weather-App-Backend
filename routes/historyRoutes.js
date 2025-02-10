const express = require("express");
const SearchHistory = require("../models/SearchHistory");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Get user search history (GET http://localhost:3000/api/history)
router.get("/history", auth, async (req, res) => {
    try {
        const history = await SearchHistory.find({ userId: req.user.id }).sort({ searchDate: -1 });
        res.json({ history });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving search history", error });
    }
});

// Delete specific search history (DELETE http://localhost:3000/api/history/:id)
router.delete("/history/:id", async (req, res) => {
    try {
        await SearchHistory.findByIdAndDelete(req.params.id);
        res.json({ message: "Search history entry deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting history entry", error });
    }
});

// Get all users  (GET http://localhost:3000/api/allusers)
router.get("/allusers", async (req, res) => {
    try {
        const result = await User.find()
        res.json({ result });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving all users", error });
    }
});

// Delete a specific user by id (DELETE http://localhost:3000/api/:id)
router.delete("/:id", async (req, res) => {
    try {
        const userId = req.params._id;
        const deletedUser = await User.findOneAndDelete({ userId });
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully'});
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;