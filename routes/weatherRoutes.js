// fetching weather data and saving search history
//Stores the search in MongoDB
// Requires authentication (auth middleware)

const express = require("express");
const axios = require("axios");  // Make HTTP requests to OpenWeatherMap API.
const SearchHistory = require("../models/SearchHistory");
const auth = require("../middleware/auth");
require("dotenv").config();  // Load environment variables from a .env file

const router = express.Router();

// Fetch weather data  (GET http://localhost:3000/api/weather?city=London)
router.get("/weather", auth, async (req, res) => {
    const { city } = req.query;   // get city by request query in the endpoint
    if (!city) return res.status(400).json({ message: "City is required" });

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
        const weatherData = response.data;

        // Save search history
        const searchEntry = new SearchHistory({
            userId: req.user.id,
            city
        });
        await searchEntry.save();

        res.json({ message: `Weather data for ${city}`, weather: weatherData });
    } catch (error) {
        res.status(500).json({ message: "Error fetching weather data", error: error.response.data });
    }
});

module.exports = router;