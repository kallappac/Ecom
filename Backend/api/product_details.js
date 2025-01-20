const express = require("express");
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();

router.get("/productdetails", async (req, res) => {
  const { product_id } = req.query;
  const limit = 12; // Number of recommended products to fetch

  if (!product_id) {
    return res.status(400).json({ error: "Missing product_id parameter" });
  }

  try {
    // Query to fetch the main product
    const mainProductResult = await pool.query(
      `SELECT * 
       FROM product_images pi2 
       INNER JOIN products p 
       ON pi2.product_id = p.product_id 
       WHERE p.product_id = $1`,
      [product_id]
    );

    // Query to fetch the recommended products (excluding the main product)
    const recommendedProductsResult = await pool.query(
      `SELECT * 
       FROM product_images pi2 
       INNER JOIN products p 
       ON pi2.product_id = p.product_id 
       WHERE p.product_id != $1 
       ORDER BY p.product_id ASC 
       LIMIT $2`,
      [product_id, limit]
    );

    // Combine main product and recommended products
    const combinedResults = [
      mainProductResult.rows, // Main product first
      recommendedProductsResult.rows, // Recommended products next
    ];

    if (combinedResults.length > 0) {
      res.status(200).json(combinedResults); // Send the rows as JSON response
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router to be used in the main server.js
module.exports = router;
