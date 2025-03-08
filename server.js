const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/keys.env" });
//console.log("JWT_SECRET:", process.env.JWT_SECRET); 

const app = express();
const port = 4000;

const userRoutes = require("./routes/userRoutes");
const catalogRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require('./routes/orderRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');


// Enable CORS with Authorization Header
app.use(cors({
    origin: "http://localhost:4000", 
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"]
}));


// Enable CORS
app.use(cors());
app.use(express.json());

// Register Routes
app.use("/api/users", userRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/feedbacks', feedbackRoutes);


// Server API Homepage 
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public","home.html"));
  // res.send("Server is running. Use API endpoints like /api/users, /api/catalog, /api/customers");
});

// Serve Registration Page (`http://localhost:4000/api/users/register`)
app.get("/api/users/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Serve Login Page (`http://localhost:4000/api/users/login`)
app.get("/api/users/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve Profile Page (`http://localhost:4000/profile`)
// app.get("/api/users/profile", (req, res) => {
//   res.send("Profile page loaded"); 
// });
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// app.get("/profile", (req, res) => {
//   res.redirect("/api/users/profile");
// });

// Ensure static files are only served AFTER API routes are checked
app.use(express.static("public"));

// Serve Admin Dashboard (`http://localhost:4000/admin`)
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// // Serve static files (Admin Dashboard + Public Assets)
// app.use(express.static(path.join(__dirname, "public")));

// Serve Stripe Payment Page (`http://localhost:4000/api/payment`)
app.get("/api/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to render the analytics page
app.get('/analytics', (req, res) => {
  res.sendFile(__dirname + '/public/analytics.html');

});
app.use("/api/feedbacks", feedbackRoutes);


// app.get("/admin/feedbacks", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "adminfeedback.html"));
// });



// Handle 404 (Not Found)
app.use((req, res) => {
  res.status(404).json({ error: "Resource not found." });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:4000`);
  console.log(`http://localhost:4000/home`)
  console.log(`http://localhost:4000/admin`)
});