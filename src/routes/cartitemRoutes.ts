import express from "express";
import { CartItemController } from "../controllers/cartItemController";

const router = express.Router();
const controller = new CartItemController();

router.post("/cart-items", (req, res) => controller.create(req, res));
router.get("/cart-items/cart/:cartId", (req, res) =>
  controller.getByCartId(req, res)
);
router.put("/cart-items/:id", (req, res) => controller.update(req, res));
router.delete("/cart-items/:id", (req, res) => controller.delete(req, res));

export default router;
