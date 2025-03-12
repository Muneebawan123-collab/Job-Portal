import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ Correct import
import "bootstrap/dist/css/bootstrap.min.css";  // ✅ Bootstrap for styling

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>   {/* ✅ Wrap inside AuthProvider */}
    <App />
  </AuthProvider>
);
