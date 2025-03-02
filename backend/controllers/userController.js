const connection = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/keys.env" });

exports.registerUser = async (req, res) => {
  const { username, password, email, role = "user" } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)";
    connection.query(sql, [username, hashedPassword, email, role], (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully", userId: results.insertId });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  });
};

exports.getUserProfile = (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT id, username, email, role FROM users WHERE id = ?";
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(results[0]);
  });
};

exports.getAllUsers = (req, res) => {
  const sql = "SELECT id, username, email, role FROM users";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving users", err });
    }
    res.status(200).json({ users: results });
  });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required" });
  }

  const sql = "UPDATE users SET username = ?, email = ? WHERE id = ?";
  connection.query(sql, [username, email, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating user", err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully!" });
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting user", err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  });
};
