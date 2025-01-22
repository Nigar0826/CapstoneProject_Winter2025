require("dotenv").config({ path: "./config/keys.env" }); // Load environment variables

const express = require("express");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/payment");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/payment", paymentRoutes);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
