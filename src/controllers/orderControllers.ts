import { Request, Response } from "express";
import { OrderModel } from "../models/orderModels";
import { CartModel } from "../models/cartModels";

export const createOrder = async (
  req: Request & { user?: { _id?: string } },
  res: Response
) => {
  try {
    const userId = req.user?._id;

    const cart = await CartModel.findOne({ user: userId }).populate(
      "items.book"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cart.items.map((item) => {
      const book: any = item.book;
      return {
        book: book && book._id ? book._id : book,
        quantity: item.quantity,
        price: typeof book?.price === "number" ? book.price : 0,
      };
    });

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new OrderModel({
      user: userId,
      items,
      totalAmount,
      status: "pending",
      createdAt: new Date(),
    });

    await order.save();

    await CartModel.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "name email")
      .populate("items.book", "title author price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getUserOrders = async (
  req: Request & { user?: { _id?: string } },
  res: Response
) => {
  try {
    const userId = req.user?._id;

    const orders = await OrderModel.find({ user: userId })
      .populate("items.book", "title author price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "paid",
      "shipped",
      "completed",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status" });
  }
};

export const cancelOrder = async (
  req: Request & { user?: { _id?: string } },
  res: Response
) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?._id;

    const order = await OrderModel.findOne({ _id: orderId, user: userId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled" });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel order" });
  }
};
