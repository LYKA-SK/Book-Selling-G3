// import { Request, Response } from "express";
// import Order from "../models/orderModels";

// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const { user, orderItems, totalPrice } = req.body;
//     const order = await Order.create({ user, orderItems, totalPrice });
//     res.status(201).json(order);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getAllOrders = async (_req: Request, res: Response) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getUserOrders = async (req: Request, res: Response) => {
//   try {
//     const orders = await Order.find({ user: req.body.user });
//     res.json(orders);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getOrderById = async (req: Request, res: Response) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     res.json(order);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateOrderStatus = async (req: Request, res: Response) => {
//   try {
//     const { status } = req.body;
//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     res.json(order);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteOrder = async (req: Request, res: Response) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.json({ message: "Order deleted successfully" });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

import { Request, Response } from "express";
import { Order } from "../models/orderModels";
import { OrderItem } from "../models/orderItemModels";
import Book from "../models/bookModels";

// ======================
// 🟢 CREATE ORDER
// ======================
export const createOrder = async (req: any, res: Response) => {
  try {
    const { items } = req.body; // items = [{ bookId, quantity }]
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    // Create empty order first
    const order = await Order.create({
      userId: req.user._id,
      status: "Pending",
      createdAt: new Date(),
    });

    const orderItems = [];

    for (const item of items) {
      const book = await Book.findById(item.bookId);
      if (!book) return res.status(404).json({ message: "Book not found" });
      if (!book.sellPrice)
        return res.status(400).json({ message: "Book price not set" });

      const totalPrice = book.sellPrice * item.quantity;

      const orderItem = await OrderItem.create({
        orderId: order._id,
        bookId: book._id,
        quantity: item.quantity,
        totalPrice,
        sellPrice: book.sellPrice,
      });

      orderItems.push(orderItem._id);
    }

    order.orderItems = orderItems;
    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("userId", "userName email")
      .populate({
        path: "orderItems",
        populate: { path: "bookId", select: "title author sellPrice" },
      });

    res.status(201).json(populatedOrder);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// 🔵 READ ALL ORDERS (Admin)
// ======================
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("userId", "userName email")
      .populate({
        path: "orderItems",
        populate: { path: "bookId", select: "title author sellPrice" },
      });
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// 🟣 READ USER ORDERS
// ======================
export const getUserOrders = async (req: any, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate({
        path: "orderItems",
        populate: { path: "bookId", select: "title author sellPrice" },
      })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// 🟡 READ ONE ORDER BY ID
// ======================
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "userName email")
      .populate({
        path: "orderItems",
        populate: { path: "bookId", select: "title author sellPrice" },
      });

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// 🟠 UPDATE ORDER ITEM
// ======================
export const updateOrderItem = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const item = await OrderItem.findById(req.params.id).populate("bookId");

    if (!item) return res.status(404).json({ message: "Order item not found" });

    item.quantity = quantity;
    item.totalPrice = item.sellPrice * quantity;
    await item.save();

    res.json(item);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// 🔴 DELETE ORDER
// ======================
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Delete all order items linked to this order
    await OrderItem.deleteMany({ orderId: order._id });
    await order.deleteOne();

    res.json({ message: "Order and related items deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// ======================
// 🔴 DELETE ONE ORDER ITEM
// ======================
export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);
    if (!orderItem)
      return res.status(404).json({ message: "Order item not found" });

    await orderItem.deleteOne();
    res.json({ message: "Order item deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
