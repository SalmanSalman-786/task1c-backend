const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  project: { type: String, required: true },
  members: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
  }

}, { timestamps: true });

module.exports = mongoose.model("Team", TeamSchema);
