import { Request, Response } from "express";

import * as cartService from "../services/cartService";

type AuthRequest = Request & { user?: { id: string } };

// Get user cart
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await cartService.getCartByUser(req.user!.id);
    res.json(cart || { items: [] });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Add book to cart
export const addItem = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const { bookId, quantity } = req.body;
    const cart = await cartService.addToCart(req.user.id, bookId, quantity);
    res.status(201).json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Remove book from cart
export const removeItem = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const { bookId } = req.params;
    const cart = await cartService.removeFromCart(req.user.id, bookId);
    res.json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update book quantity
export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const { bookId, quantity } = req.body;
    const cart = await cartService.updateCartItem(
      req.user.id,
      bookId,
      quantity
    );
    res.json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Clear cart
export const clearUserCart = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const cart = await cartService.clearCart(req.user.id);
    res.json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
