const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/job_portal";

app.use(express.json()); // This allows Express to parse JSON request bodies

app.use((req, res, next) => {
    console.log("Auth Header:", req.headers.authorization); // Check if token is received
    next();
});


mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

// Import Routes
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
