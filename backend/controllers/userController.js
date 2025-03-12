const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role="user" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert email to lowercase
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash Password Once
    console.log("🔹 Plain Password Before Hashing:", password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🔹 Hashed Password Before Saving:", hashedPassword);

    // ✅ Create and Save New User
    const user = new User({ 
      name, 
      email: email.toLowerCase(), 
      password: hashedPassword, // 🔹 Store the hashed password correctly
      role 
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Convert email to lowercase before searching
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 🔥 DEBUG: Log entered and stored credentials
    console.log("🔹 Entered Email:", email);
    console.log("🔹 Stored Email in DB:", user.email);
    console.log("🔹 Entered Password:", password);
    console.log("🔹 Stored Hashed Password in DB:", user.password);

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    // 🔥 DEBUG: Check if the password matches
    console.log("🔹 Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { registerUser, loginUser };
