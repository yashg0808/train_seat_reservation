// server/index.js

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seatRoutes = require("./routes/seatRoutes");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", seatRoutes);  // Prefix all routes with /api

// Server
module.exports = app;