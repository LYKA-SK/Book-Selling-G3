import { CartModel } from "../models/cartModels";
import mongoose from "mongoose";

// Get the cart for a user
export const getCartByUser = async (userId: string) => {
  return CartModel.findOne({ user: userId }).populate("items.book");
};

// Add a book to the cart
export const addToCart = async (
  userId: string,
  bookId: string,
  quantity: number = 1
) => {
  let cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    cart = new CartModel({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.book.toString() === bookId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ book: new mongoose.Types.ObjectId(bookId), quantity });
  }

  return cart.save();
};

// Remove a book from the cart
export const removeFromCart = async (userId: string, bookId: string) => {
  const cart = await CartModel.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter((item) => item.book.toString() !== bookId);
  return cart.save();
};

// Update quantity of a book in the cart
export const updateCartItem = async (
  userId: string,
  bookId: string,
  quantity: number
) => {
  const cart = await CartModel.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find((item) => item.book.toString() === bookId);
  if (!item) throw new Error("Book not found in cart");

  item.quantity = quantity;
  return cart.save();
};

// Clear the entire cart
export const clearCart = async (userId: string) => {
  const cart = await CartModel.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = [];
  return cart.save();
};
