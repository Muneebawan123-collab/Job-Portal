const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ✅ Create a Job (Protected Route)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    console.log("User ID from Token:", req.user.id);


    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      postedBy: req.user.id,
    });
    console.log("Received Data:", req.body);


    await job.save();
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Error creating job", error: error.message });
  }
});

// ✅ Get All Jobs (Public or Protected)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
});

// ✅ Get Job by ID (Public or Protected)
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Error fetching job", error: error.message });
  }
});

module.exports = router;
