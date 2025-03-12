const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.header("Authorization"); // Get token from headers
  console.log("Decoded Token Data:", decoded);

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length); // Remove "Bearer " prefix
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user data to request
    next(); // Call next middleware
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
