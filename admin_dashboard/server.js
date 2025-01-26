const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Sample customer data
const customers = [
    { id: 1, name: "John Loiuson", email: "john@example.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "jane12@example.com", phone: "987-654-3210" }
];

// Middleware
app.use(cors());
app.use(express.json());

// API to get customers
app.get("/api/customers", (req, res) => {
    res.json(customers);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
