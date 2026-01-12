const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  project: { type: String, required: true },
  members: { type: Number, required: true },
  email: { type: String, required: true, unique: true }

}, { timestamps: true });

module.exports = mongoose.model("Team", TeamSchema);
