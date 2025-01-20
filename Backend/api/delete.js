const express = require("express");
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();
const cors = require("cors");

// Allow all origins
router.use(cors());

router.get("/delete-cart-items/:cart_id/:cart_item_id", async (req, res) => {
  const { cart_id, cart_item_id } = req.params;


  // Log the received query parameters (for debugging purposes)


  // Validate that both cart_id and cart_item_id are provided and are integers
  // if (!cart_id || !cart_item_id || isNaN(cart_id) || isNaN(cart_item_id)) {
  //   return res.status(400).json({ error: "Invalid cart_id or cart_item_id" });
  // }

  try {
    // Perform the delete query
    const result = await pool.query(
      "DELETE FROM cart_items WHERE cart_id=$1 AND cart_item_id=$2 RETURNING *",
      [cart_id, cart_item_id]
    );

    console.log("Delete result:", result);

    // If rows were deleted, return the deleted rows
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Product Deleted Successfully" });
 // Send the rows as JSON response
    } else {
      res.status(404).json({ message: "No items found to delete" });
    }
  } catch (error) {
    // Log error details
    console.error(
      "Error while deleting cart items:",
      error.message,
      error.stack
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router to be used in the main server.js
module.exports = router;
