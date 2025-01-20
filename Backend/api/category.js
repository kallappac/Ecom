const express = require("express");
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();

router.post("/add-category", async (req, res) => {
  const { name, description } = req.body;

  try {
    const result = await pool.query(
      ` INSERT INTO categories (name, description)
            VALUES ($1, $2)
            RETURNING *`,
      [name, description]
    );
    // const values = [name, description];
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Category inserted Successfully" }); // Send the rows as JSON response
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/delete-category/:category_id", async (req, res) => {
  const { category_id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE categories SET is_active=false WHERE category_id=$1`,
      [category_id]
    );
    // const values = [name, description];

    if (result.rowCount) {
      res.status(200).json({ message: "Category Deleted  Successfully" }); // Send the rows as JSON response
    } else {
      res.status(200).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-category", async (req, res) => {


  try {
    const result = await pool.query(
      ` SELECT * from categories where is_active=true`,
  );
    // const values = [name, description];
    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Send the rows as JSON response
    } else {
      res.status(404).json({ message: "No Category found" });
    }
  } catch (error) {
    console.error("Error fetching Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Export the router to be used in the main server.js
module.exports = router;
