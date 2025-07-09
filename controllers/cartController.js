const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await Cart.findOne({ userId: req.user });
  if (!cart) {
    cart = new Cart({ userId: req.user, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
};

exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(item => item.productId.toString() === productId);
  if (!item) return res.status(404).json({ message: "Item not found in cart" });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
};

exports.removeCartItem = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  await cart.save();
  res.json(cart);
};
