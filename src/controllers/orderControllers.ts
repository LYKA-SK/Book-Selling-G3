import { Request, Response } from "express";
import { Order } from "../models/orderModels";
import { OrderItem } from "../models/orderItemModels";
import { Cart } from "../models/cartModels";

/**
 * Type used to represent populated cart documents
 */
interface PopulatedCart {
  bookId: any;
  userId: string;
  quantity: number;
}

/**
 * ==============================
 * 🟢 CREATE ORDER
 * ==============================
 */
export const createOrder = async (req: any, res: Response) => {
  try {
    console.log("🛒 Creating new order...");

    // 1️⃣ Find user from token
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: no user found" });
    }

    // 2️⃣ Find user's cart
    const cartItems = (await Cart.find({ userId }).populate(
      "bookId"
    )) as unknown as PopulatedCart[];

    console.log("🧺 Cart items found:", cartItems.length);

    if (!cartItems.length) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // 3️⃣ Create order items
    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        const book = item.bookId;
        if (!book) throw new Error("Book not found in cart item");

        const totalPrice = book.sellPrice * item.quantity;

        const orderItem = new OrderItem({
          bookId: book._id,
          quantity: item.quantity,
          sellPrice: book.sellPrice,
          totalPrice,
        });

        await orderItem.save();
        return orderItem._id;
      })
    );

    // 4️⃣ Create order document
    const order = new Order({
      userId,
      orderItemId: orderItems,
    });

    await order.save();

    // 5️⃣ Clear the user's cart
    await Cart.deleteMany({ userId });

    console.log("✅ Order created successfully:", order._id);

    res.status(201).json({
      message: "✅ Order created successfully",
      order,
    });
  } catch (error: any) {
    console.error("❌ Error in createOrder:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

/**
 * ==============================
 * 🟣 GET ALL ORDERS (Admin)
 * ==============================
 */
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("userId", "firstName lastName email")
      .populate({
        path: "orderItemId",
        populate: { path: "bookId", select: "title author sellPrice" },
      });

    res.status(200).json(orders);
  } catch (error: any) {
    console.error("❌ Error in getAllOrders:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

/**
 * ==============================
 * 🟢 GET USER'S ORDERS
 * ==============================
 */
export const getUserOrders = async (req: any, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: no user found" });
    }

    const orders = await Order.find({ userId })
      .populate({
        path: "orderItemId",
        populate: { path: "bookId", select: "title author sellPrice" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error: any) {
    console.error("❌ Error in getUserOrders:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

/**
 * ==============================
 * 🟠 GET ONE ORDER BY ID
 * ==============================
 */
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate({
        path: "orderItemId",
        populate: { path: "bookId", select: "title author sellPrice" },
      })
      .populate("userId", "firstName lastName email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error: any) {
    console.error("❌ Error in getOrderById:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
