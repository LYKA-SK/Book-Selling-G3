import { Cart } from "../models/cartModels";

interface ServiceResult {
  status: number;
  message: string;
  data?: any;
}

export class CartService {
  // CREATE CART
  async createCart(userId: string): Promise<ServiceResult> {
    try {
      const existinUserIdInCard = await Cart.findOne({ userId: userId });
      if (existinUserIdInCard) {
        return {
          status: 400,
          message: "Cart already exists for this user",
        };
      }
      const cart = new Cart({ userId, items: [] });
      const savedCart = await cart.save();
      return {
        status: 201,
        message: "Cart created successfully",
        data: savedCart,
      };
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }

  // GET CART BY USER ID
  async getCartByUserId(userId: string): Promise<ServiceResult> {
    try {
      const cart = await Cart.findOne({ userId }).populate({
        path: "items",
        populate: { path: "bookId" },
      });
      if (!cart) return { status: 404, message: "Cart not found" };
      return { status: 200, message: "Cart fetched successfully", data: cart };
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }

  // UPDATE CART (e.g., add/remove items)
  async updateCart(cartId: string, items: string[]): Promise<ServiceResult> {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        cartId,
        { items },
        { new: true }
      ).populate({
        path: "items",
        populate: { path: "bookId" },
      });

      if (!updatedCart) return { status: 404, message: "Cart not found" };
      return {
        status: 200,
        message: "Cart updated successfully",
        data: updatedCart,
      };
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }

  // DELETE CART
  async deleteCart(cartId: string): Promise<ServiceResult> {
    try {
      const deletedCart = await Cart.findByIdAndDelete(cartId);
      if (!deletedCart) return { status: 404, message: "Cart not found" };
      return {
        status: 200,
        message: "Cart deleted successfully",
        data: deletedCart,
      };
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }
}
