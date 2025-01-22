// Load environment variables
require("dotenv").config({ path: "./config/keys.env" });

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/payment");

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());

// Serve static files (Frontend)
app.use(express.static("public"));

// API Routes
app.use("/api/payment", paymentRoutes);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
