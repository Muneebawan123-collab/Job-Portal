const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const morgan = require("morgan"); // Optional for logging

// Load environment variables
dotenv.config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/job_portal";


// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Allows Express to parse JSON request bodies
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(morgan("dev")); // Logs incoming requests

// Debugging: Check if auth token is received
app.use((req, res, next) => {
    console.log("Auth Header:", req.headers.authorization);
    next();
});

console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);


// Import Routes
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
