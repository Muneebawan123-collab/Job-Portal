// src/pages/PostJob.jsx
import { useState } from "react";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import API_URL from "../api"; // Import API URL

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading
  
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        setMessage("Unauthorized! Please login.");
        setLoading(false);
        return;
      }

      // Ensure salary is sent as a number
      const jobData = {
        ...formData,
        salary: Number(formData.salary) || 0,
      };

      console.log("Submitting Job Data:", jobData);

      const response = await fetch(`${API_URL}/jobs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include token
        },
        body: JSON.stringify(jobData),
      });

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to post job");
      }

      setMessage("Job posted successfully!");
      setFormData({ title: "", description: "", company: "", location: "", salary: "" });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Error:", error);
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <Container className="mt-4">
      <h2>Post a Job</h2>

      {/* Alert message for success or error */}
      {message && <Alert variant={message.includes("success") ? "success" : "danger"}>{message}</Alert>}

      <Form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        {/* Job Title */}
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} autoComplete="off" required />
        </Form.Group>

        {/* Company */}
        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" name="company" value={formData.company} onChange={handleChange} autoComplete="off" required />
        </Form.Group>

        {/* Location */}
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} autoComplete="off" required />
        </Form.Group>

        {/* Salary */}
        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control type="number" name="salary" value={formData.salary} onChange={handleChange} autoComplete="off" required />
        </Form.Group>

        {/* Job Description */}
        <Form.Group className="mb-3">
          <Form.Label>Job Description</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} autoComplete="off" required />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Post Job"}
        </Button>
      </Form>
    </Container>
  );
};

export default PostJob;
