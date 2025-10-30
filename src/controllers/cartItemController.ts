import { Request, Response } from "express";
import { CartItemService } from "../services/cartitemService";

const cartItemService = new CartItemService();

export class CartItemController {
  // CREATE CART ITEM
  async create(req: Request, res: Response) {
    const data = req.body;
    const result = await cartItemService.createCartItem(data);
    res.status(result.status).json(result);
  }

  // GET CART ITEMS BY CART ID
  async getByCartId(req: Request, res: Response) {
    const cartId = req.params.cartId;
    const result = await cartItemService.getCartItemsByCartId(cartId);
    res.status(result.status).json(result);
  }

  // UPDATE CART ITEM
  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { quantity } = req.body;
    const result = await cartItemService.updateCartItem(id, quantity);
    res.status(result.status).json(result);
  }

  // DELETE CART ITEM
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const result = await cartItemService.deleteCartItem(id);
    res.status(result.status).json(result);
  }
}
