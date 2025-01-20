const express = require("express");
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();

router.get("/getorder/:userid", async (req, res) => {
  const user_id = 2;
 const{userid} = req.params

  if (!user_id) {
    return res.status(400).json({ error: "Please login" });
  }

  try {
    // Query to fetch the main product
    const getOrder = await pool.query(
      `SELECT 
    o.*,         
    oi.*,      
    p.*,       
    pi2.*         
FROM 
    orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    JOIN product_images pi2 ON p.product_id = pi2.product_id
WHERE 
    o.user_id = $1 ORDER BY 
    o.order_date DESC`,
      [userid]
    );

   
  
    if (getOrder.rows.length > 0) {
      res.status(200).json(getOrder.rows); // Send the rows as JSON response
    } else {
      res.status(200).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching Order details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/getallorder", async (req, res) => {




  try {
    // Query to fetch the main product
    const getOrder = await pool.query(
      `SELECT 
    o.*,         
    oi.*,      
    p.*,       
    pi2.*  ,
    u.*       
FROM 
    orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    JOIN product_images pi2 ON p.product_id = pi2.product_id
    JOIN users u ON u.user_id = o.user_id

 ORDER BY 
         o.order_date desc`
    );

   
  
    if (getOrder.rows.length > 0) {
      res.status(200).json(getOrder.rows); // Send the rows as JSON response
    } else {
      res.status(200).json({ message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching Order details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/updateLineItemStatus", async (req, res) => {
  const { line_item_id, line_item_status } = req.body; // Expecting both line_item_id and line_item_status from the request body

  // Validate input
  if (!line_item_id || !line_item_status) {
    return res.status(400).json({ error: "line_item_id and line_item_status are required" });
  }

  try {
    // Update the line_item_status in the database
    const updateQuery = await pool.query(
      `UPDATE order_items 
       SET line_item_status = $1 
       WHERE order_item_id = $2 
       RETURNING *`,
      [line_item_status, line_item_id]
    );

    if (updateQuery.rowCount > 0) {
      res.status(200).json({
        message: "Line item status updated successfully",
        updatedLineItem: updateQuery.rows[0],
      });
    } else {
      res.status(404).json({ error: "Line item not found" });
    }
  } catch (error) {
    console.error("Error updating line item status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





// Export the router to be used in the main server.js
module.exports = router;
