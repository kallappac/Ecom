const express = require("express");
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();

// API route to get all banners
router.get("/banners", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM banner");

    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Send the rows as JSON response
    } else {
      res.status(404).json({ message: "No banners found" });
    }
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

 router.get("/delete-banner/:id", async (req, res) => {
    const { id } = req.params;
    try {
      // Correct DELETE query with RETURNING clause to fetch deleted row(s)
      const result = await pool.query(
        `DELETE FROM banner WHERE id = $1 RETURNING *`,
        [id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Banner not found!" });
      }
  
      return res.status(200).json({
        message: "Banner Deleted successfully!",
        deletedBanner: result.rows[0], // Optionally include the deleted banner data
      });
    } catch (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  });


// API route to get all categories
router.get("/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");

    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Send the rows as JSON response
    } else {
      res.status(404).json({ message: "No categories found" });
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router to be used in the main server.js
module.exports = router;
