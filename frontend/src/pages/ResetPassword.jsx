import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label>New Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
