const express = require("express");
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();

router.post("/add-to-cart", async (req, res) => {
  const { user_id, product_id, quantity, cart_id } = req.body;
 console.log(req.body);

  try {
    let cartToUse = cart_id;

    // Step 1: Check if cart_id is provided
    if (cartToUse) {
      // If cart_id is provided, check if it exists for the given user
      const cartResult = await pool.query(
        "SELECT cart_id FROM cart WHERE cart_id = $1 AND user_id = $2",
        [cartToUse, user_id]
      );

      if (cartResult.rows.length === 0) {
        // If the cart doesn't exist, return an error
        return res.status(400).json({
          error:
            "Cart does not exist for the given user. Please create a new cart.",
        });
      }

      // If cart exists, update the cart's updated_at timestamp
      await pool.query(
        "UPDATE cart SET updated_at = CURRENT_TIMESTAMP WHERE cart_id = $1",
        [cartToUse]
      );
    } else {
      // Step 2: If no cart_id is provided, create a new cart
      const cart = await pool.query(
        "INSERT INTO cart (user_id) VALUES ($1) RETURNING cart_id, created_at, updated_at",
        [user_id]
      );
      cartToUse = cart.rows[0].cart_id;
    }

    // Step 3: Check if the product already exists in the cart
    const existingProductResult = await pool.query(
      "SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2",
      [cartToUse, product_id]
    );

    let cart_item_id, newQuantity;
    if (existingProductResult.rows.length > 0) {
      // If the product exists, update the quantity
      const existingProduct = existingProductResult.rows[0];
      newQuantity = existingProduct.quantity + quantity;

      // Update the quantity in the cart
      await pool.query(
        "UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2",
        [newQuantity, existingProduct.cart_item_id]
      );
      cart_item_id = existingProduct.cart_item_id;
    } else {
      // If the product doesn't exist, add it to the cart
      const addItemResult = await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING cart_item_id, added_at",
        [cartToUse, product_id, quantity]
      );
      cart_item_id = addItemResult.rows[0].cart_item_id;
    }

    res.status(200).json({
      message: "Item added to cart successfully",
      cart_id: cartToUse,
      cart_item_id,
      quantity: newQuantity || quantity, // Return the updated quantity if changed
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong while adding to cart" });
  }
});


router.get('/cart/:cartId', async (req, res) => {
  const { cartId } = req.params;

  const query = `SELECT 
    c.*,
    ci.*,
    p.*,
    pi2.*
FROM 
    cart c
INNER JOIN 
    cart_items ci ON c.cart_id = ci.cart_id
INNER JOIN 
    products p ON ci.product_id = p.product_id
INNER JOIN 
    product_images pi2 ON p.product_id = pi2.product_id
WHERE 
    c.cart_id = $1;`

  try {
    const { rows } = await pool.query(query, [cartId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No cart items found for the given cart ID' });
    }

    res.json({ cartId, items: rows });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})
module.exports = router;
