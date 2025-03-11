import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../api";
import { Link } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("Fetching jobs from:", `${API_URL}/jobs`);
        const response = await axios.get(`${API_URL}/jobs`);
        console.log("Response received:", response.data);
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Job Listings</h2>
      {jobs.length > 0 ? (
        <div className="list-group">
          {jobs.map((job) => (
            <Link 
              to={`/job/${job._id}`} 
              className="list-group-item list-group-item-action" 
              key={job._id}
            >
              <h5>{job.title} - {job.company}</h5>
              <p className="mb-1"><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default Home;
