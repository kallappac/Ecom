const express = require("express");
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();

// API route to get all products
router.get("/products", async (req, res) => {
  const { category_id } = req.query;
  console.log(category_id);
  try {
    const result = await pool.query(
      "SELECT p.*, pi.image_url FROM products p LEFT JOIN product_images pi ON p.product_id = pi.product_id WHERE p.category_id = $1",
      [category_id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Send the rows as JSON response
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add-products", async (req, res) => {
  const { product_name,desc,category_id,price,totalquantity,sku } = req.body;
  console.log(req.body);
  try {

     const checksku= await pool.query(
      `SELECT * FROM products WHERE sku=$1 `,[sku]);
     if(checksku.rows.length>0){
        res.status(200).json({ message: "Product with same SKU already exists" ,success:false});
        return;
     }



    const result = await pool.query(
      `INSERT INTO products 
      (name, description, category_id, price, stock_quantity, sku)
      VALUES 
      ($1, $2, $3, $4, $5, $6)
      RETURNING * `,[product_name,desc,category_id,price,totalquantity,sku]);



    if (result.rows.length > 0) {
      res.status(200).json({message:"product Inserted sucessfully",success:true}); // Send the rows as JSON response
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router to be used in the main server.js
module.exports = router;
