import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Response Data:", data); // Debugging
      console.log("Response Status:", response.status); // Debugging
  
      if (response.ok) {
        setMessage("Registration successful! Please login.");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage(data.message || "Error registering user.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server not reachable. Check if backend is running.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Register</h2>
      {message && <Alert variant={message.includes("successful") ? "success" : "danger"}>{message}</Alert>}
      <Form onSubmit={handleSubmit} className="shadow p-4 bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>

        <Button variant="success" type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default Register;
