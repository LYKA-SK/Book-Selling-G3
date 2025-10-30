import express from "express";
import { CartController } from "../controllers/cartController";

const router = express.Router();
const controller = new CartController();

// CRUD endpoints
router.post("/", controller.create.bind(controller)); // Create cart
router.get("/:userId", controller.getByUser.bind(controller)); // Get cart by user
router.put("/:id", controller.update.bind(controller)); // Update cart
router.delete("/:id", controller.delete.bind(controller)); // Delete cart

export default router;
