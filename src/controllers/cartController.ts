import { Request, Response } from "express";
import { CartService } from "../services/cartservic";

const cartService = new CartService();

export class CartController {
  async create(req: Request, res: Response) {
    const userId = req.body.userId; // or req.user.id if auth middleware
    const result = await cartService.createCart(userId);
    res.status(result.status).json(result);
  }

  async getByUser(req: Request, res: Response) {
    const userId = req.params.userId;
    const result = await cartService.getCartByUserId(userId);
    res.status(result.status).json(result);
  }

  async update(req: Request, res: Response) {
    const cartId = req.params.id;
    const items: string[] = req.body.items; // array of CartItem IDs
    const result = await cartService.updateCart(cartId, items);
    res.status(result.status).json(result);
  }

  async delete(req: Request, res: Response) {
    const cartId = req.params.id;
    const result = await cartService.deleteCart(cartId);
    res.status(result.status).json(result);
  }
}
