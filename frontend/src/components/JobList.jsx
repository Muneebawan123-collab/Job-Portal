import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/jobs`);
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Job Listings</h2>
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text"><strong>Company:</strong> {job.company}</p>
                  <p className="card-text"><strong>Location:</strong> {job.location}</p>
                  <p className="card-text"><strong>Salary:</strong> {job.salary}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
