// Connect MongoDB, set up middleware, and start Express server.
const express = require("express");
const cors = require("cors");  // to enable Cross-Origin Resource Sharing
const bodyParser = require("body-parser");  // to Parse incoming request JSON
const connectDB = require("./config/db");
const weatherRoutes = require("./routes/weatherRoutes");
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");
const historyRoutes = require("./routes/historyRoutes");
require("dotenv").config();      // load variables from the .env file

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000 // The port in the . env file  or 3000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", signupRoutes);
app.use("/api", loginRoutes);
app.use("/api", weatherRoutes);
app.use("/api", historyRoutes);

app.get("/", (req, res) => {
    res.send("Weather App API is running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});