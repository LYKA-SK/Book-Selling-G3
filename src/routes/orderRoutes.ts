import { Router } from "express";
import * as orderControllers from "../controllers/orderControllers";
import { Auth } from "../middlewares/auth";
const router = Router();

router.post("/", Auth, orderControllers.createOrder);
router.get("/", Auth, orderControllers.getAllOrders);
router.get("/my", Auth, orderControllers.getUserOrders);
router.get("/:id", Auth, orderControllers.getOrderById);
router.put("/:id/status", Auth, orderControllers.updateOrderStatus);
router.delete("/:id", Auth, orderControllers.deleteOrder);

export default router;
