import { CartItem, ICartItemDocument } from "../models/cartitemModels";
import { Types } from "mongoose";

export class CartItemService {
  // CREATE CART ITEM
  async createCartItem(data: {
    cartId: string;
    bookId: string;
    quantity: number;
  }) {
    try {
      if (
        !Types.ObjectId.isValid(data.cartId) ||
        !Types.ObjectId.isValid(data.bookId)
      ) {
        return { status: 400, error: "Invalid cartId or bookId" };
      }

      const cartItem: ICartItemDocument = (await CartItem.create({
        cartId: new Types.ObjectId(data.cartId),
        bookId: new Types.ObjectId(data.bookId),
        quantity: data.quantity,
      })) as ICartItemDocument;

      return {
        status: 201,
        data: {
          id: cartItem._id, // map _id → id
          cartId: cartItem.cartId,
          bookId: cartItem.bookId,
          quantity: cartItem.quantity,
          createdAt: cartItem.createdAt,
          updatedAt: cartItem.updatedAt,
        },
      };
    } catch (err) {
      return { status: 500, error: (err as Error).message };
    }
  }

  // GET CART ITEMS BY CART ID
  async getCartItemsByCartId(cartId: string) {
    try {
      if (!Types.ObjectId.isValid(cartId))
        return { status: 400, error: "Invalid cartId" };

      const items = await CartItem.find({
        cartId: new Types.ObjectId(cartId),
      }).populate("bookId");

      const data = items.map((item) => ({
        id: item._id,
        cartId: item.cartId,
        bookId: item.bookId,
        quantity: item.quantity,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));

      return { status: 200, data };
    } catch (err) {
      return { status: 500, error: (err as Error).message };
    }
  }

  // UPDATE CART ITEM
  async updateCartItem(id: string, quantity: number) {
    try {
      if (!Types.ObjectId.isValid(id))
        return { status: 400, error: "Invalid cartItem id" };

      const updated = await CartItem.findByIdAndUpdate(
        new Types.ObjectId(id),
        { quantity },
        { new: true }
      );

      if (!updated) return { status: 404, error: "CartItem not found" };

      return {
        status: 200,
        data: {
          id: updated._id,
          cartId: updated.cartId,
          bookId: updated.bookId,
          quantity: updated.quantity,
          createdAt: updated.createdAt,
          updatedAt: updated.updatedAt,
        },
      };
    } catch (err) {
      return { status: 500, error: (err as Error).message };
    }
  }

  // DELETE CART ITEM
  async deleteCartItem(id: string) {
    try {
      if (!Types.ObjectId.isValid(id))
        return { status: 400, error: "Invalid cartItem id" };

      const deleted = await CartItem.findByIdAndDelete(new Types.ObjectId(id));

      if (!deleted) return { status: 404, error: "CartItem not found" };

      return {
        status: 200,
        data: { message: "CartItem deleted successfully" },
      };
    } catch (err) {
      return { status: 500, error: (err as Error).message };
    }
  }
}
