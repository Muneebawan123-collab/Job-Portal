import { useState } from "react";
import axios from "axios";
import API_URL from "../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error sending reset email");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Forgot Password</h2>
      <p>Enter your email to receive a password reset link.</p>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
