import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs`);
        setJobs(response.data); // Store jobs in state
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Latest Job Listings</h2>
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="col-md-4 mb-4" key={job._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text">{job.description.slice(0, 100)}...</p>
                  <p className="text-success fw-bold">💰 Salary: {job.salary}</p>
                  <p className="text-primary fw-bold">📍 Location: {job.location}</p>
                  <button className="btn btn-primary">Apply Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No jobs available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
