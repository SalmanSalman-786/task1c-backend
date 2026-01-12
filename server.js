const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

// API routes
app.use("/api/teams", require("./routes/teamRoutes"));

// ✅ Fallback → Frontend (Express 5 safe)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
