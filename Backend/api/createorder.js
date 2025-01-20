const express = require("express");
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();

// API route to get all products
router.post("/create-order", async (req, res) => {
  const { order } = req.body;
  const {
    user_id,
    total_amount,
    shipping_address_id,
    billing_address_id,
    order_status,
    payment_method="cash",
    tracking_number="null",
    items, // Array of items
  } = req.body;

  const today = new Date(); // Get today's date and time
  const today_order_date = `${today.toISOString().split('T')[0]} ${today.toTimeString().split(' ')[0]}`; // "YYYY-MM-DD HH:MM:SS"
  
  try {
    // Start transaction
//  await client.pool('BEGIN');

    // Insert into the `orders` table
    const orderResult = await pool.query(
      `INSERT INTO orders (
        user_id, total_amount, order_date, shipping_address_id, 
        billing_address_id, order_status, payment_method, tracking_number
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        user_id,
        total_amount,
        today_order_date,
        shipping_address_id,
        billing_address_id,
        order_status,
        payment_method,
        tracking_number,
      ]
    );

    const order = orderResult.rows[0]; // The created order

    // Insert items into `order_items` table
    for (const item of items) {
      const { product_id, quantity, unit_price } = item;
       const subtotal=quantity*unit_price
      await pool.query(
        `INSERT INTO order_items (
          order_id, product_id, quantity, unit_price, subtotal
        ) VALUES ($1, $2, $3, $4, $5)`,
        [order.order_id, product_id, quantity, unit_price, subtotal]
      );
    }

    // Commit transaction
   // await client.query('COMMIT');

    res.status(201).json({
      message: 'Order and items created successfully',
      order,
    });
  } catch (error) {
    // Rollback on error
    // await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    //client.release();
  }
});

// Export the router to be used in the main server.js
module.exports = router;
