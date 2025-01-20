// Import necessary modules
const express = require("express");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());

// User registration endpoint
app.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      first_name = "null",
      last_name = "null",
      phone_number,
      role = "user", // Default role
    } = req.body;
    console.log(req.body);
    // Validate input (you can enhance validation as needed)
    if (!username || !email || !password || !phone_number) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const checkQuery = `
    SELECT * FROM users WHERE phone_number = $1;
  `;
    const checkResult = await pool.query(checkQuery, [phone_number]);

    const checkQuery2 = `
    SELECT * FROM users WHERE email = $1;
  `;
    const checkResult2 = await pool.query(checkQuery2, [email]);
    if (checkResult.rows.length > 0 || checkResult2.rows.length > 0) {
      return res.status(200).json({ message: "User already exists." });
    }
    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // Current timestamps
    const created_at = new Date();
    const last_login = null; // Initially null
    const is_active = true; // Default to active user

    // Insert user data into the database
    const query = `
      INSERT INTO users (
        username, email, password_hash, first_name, last_name, phone_number,
        created_at, last_login, is_active, role
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING user_id;
    `;

    const values = [
      username,
      email,
      password_hash,
      first_name,
      last_name,
      phone_number,
      created_at,
      last_login,
      is_active,
      role,
    ];

    const result = await pool.query(query, values);

    // Respond with success and the new user's ID
    res.status(201).json({
      message: "User registered successfully.",
      user_id: result.rows[0].user_id,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

const JWT_SECRET = process.env.JWT_SECRET

app.post("/login", async (req, res) => {
  try {
    const { phone_number, email, password } = req.body;
    console.log(req.body);

    // Validate input
    if ((!phone_number && !email) || !password) {
      return res
        .status(400)
        .json({ message: "Phone number/email and password are required." });
    }

    let user;
    if (phone_number) {
      // Check if phone number exists in the database
      const query = `SELECT * FROM users WHERE phone_number = $1`;
      const result = await pool.query(query, [phone_number]);
      user = result.rows[0];
    } else if (email) {
      // Check if email exists in the database
      const query = `SELECT * FROM users WHERE email = $1`;
      const result = await pool.query(query, [email]);
      user = result.rows[0];
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Update last login timestamp (optional)
    const updateQuery = `UPDATE users SET last_login = $1 WHERE user_id = $2`;
    const updateValues = [new Date(), user.user_id];
    await pool.query(updateQuery, updateValues);

    // Create JWT token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with a success message, user data, and JWT token
    const { password_hash, ...userData } = user;
    res.status(200).json({
      message: "Login successful.",
      user: userData, // User data without the password hash
      token, // JWT token
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Export the router
module.exports = app;
