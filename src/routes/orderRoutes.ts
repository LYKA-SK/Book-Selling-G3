import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderItem,
  deleteOrder,
  deleteOrderItem,
} from "../controllers/orderControllers";
import { Auth } from "../middlewares/auth";

const router = Router();

router.post("/", Auth, createOrder); // Create new order
router.get("/", Auth, getAllOrders); // Get all orders (admin)
router.get("/my", Auth, getUserOrders); // Get logged-in user's orders
router.get("/:id", Auth, getOrderById); // Get one order by ID
router.put("/item/:id", Auth, updateOrderItem); // Update order item
router.delete("/:id", Auth, deleteOrder); // Delete order
router.delete("/item/:id", Auth, deleteOrderItem); // Delete order item

export default router;
