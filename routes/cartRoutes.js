const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

router.post("/cart", protect, addToCart);
router.put("/cart/:productId", protect, updateCartItem);
router.delete("/cart/:productId", protect, removeCartItem);

module.exports = router;
