const express = require("express");
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();




router.get("/get-allproducts", async (req, res) => {


  try {
    const result = await pool.query(
      `  SELECT p.*, pi.image_url FROM products p LEFT JOIN product_images pi ON p.product_id = pi.product_id ORDER BY p.created_at DESC`,
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
