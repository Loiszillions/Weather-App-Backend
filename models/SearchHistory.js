// Links search history to a user (userId).
// Store searched city name.
//  searchDate automatically records when the search was made.
const mongoose = require("mongoose"); // MongoDB ORM for defining schemas

const searchHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    city: { type: String, required: true },
    searchDate: { type: Date, default: Date.now }
}, { timestamps: true }); //automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("SearchHistory", searchHistorySchema);

// The UserId is to save the generated .id or_id as the case may be