import { Router } from "express";
import * as orderController from "../controllers/orderControllers";
import { Auth } from "../middlewares/auth";

const router = Router();

// Create new order (User)
router.post("/", Auth, orderController.createOrder);

// Get all orders (Admin)
router.get("/", Auth, orderController.getAllOrders);

// Get logged-in user's orders
router.get("/my", Auth, orderController.getUserOrders);

// Get order by ID
router.get("/:id", Auth, orderController.getOrderById);

export default router;
