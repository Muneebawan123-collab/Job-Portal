const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware"); 
const { createJob, getAllJobs, getJobById, deleteJob } = require("../controllers/jobController");

// Create Job
router.post("/create", authenticate, createJob);

// Get all jobs
router.get("/", getAllJobs);

// Get job by ID
router.get("/:id", getJobById);

// Delete job (only job poster can delete)
router.delete("/:id", authenticate, deleteJob);

module.exports = router;
