const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 🚀 No extra hashing here
  //role: { type: String, enum: ["jobseeker", "employer"], default: "jobseeker" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
