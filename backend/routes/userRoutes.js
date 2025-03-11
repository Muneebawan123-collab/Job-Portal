const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config(); // Load environment variables
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔹 Protected Profile Route
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        res.json({ message: "Welcome to your profile!", user: req.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Forgot Password Route
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Generate Reset Token
    const token = crypto.randomBytes(20).toString("hex");
    user.resetToken = token;
    user.tokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send Email with Reset Link
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Password Reset",
        text: `Click this link to reset your password: http://localhost:5173/reset-password/${token}`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) return res.status(500).json({ message: "Email could not be sent" });
        res.json({ message: "Password reset email sent!" });
    });
});

// 🔹 Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ resetToken: token, tokenExpiry: { $gt: Date.now() } });

    if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
});

module.exports = router;
