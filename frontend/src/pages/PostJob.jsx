import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/jobs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Job posted successfully!");
      setFormData({ title: "", description: "", company: "", location: "", salary: "" });
    } else {
      setMessage("Error posting job. Try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Post a Job</h2>
      {message && <Alert variant={message.includes("success") ? "success" : "danger"}>{message}</Alert>}
      <Form onSubmit={handleSubmit} className="shadow p-4 bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" name="company" value={formData.company} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Job Description</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">Post Job</Button>
      </Form>
    </Container>
  );
};

export default PostJob;
