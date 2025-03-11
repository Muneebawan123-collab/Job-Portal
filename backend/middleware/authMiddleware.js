const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization"); // Get the Authorization header

    console.log("Auth Header:", authHeader); // Debugging log

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied! No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract only the token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Add user details to request object
        next(); // Move to the next middleware or route
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = authMiddleware;
