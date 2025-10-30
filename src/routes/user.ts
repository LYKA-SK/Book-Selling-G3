import { Router } from "express";
import userController from "../controllers/userController";
import { protect } from "../middlewares/auth";

const router = Router();

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected routes
router.get("/profile", protect, userController.getProfile);
router.post("/refresh-token", protect, userController.refreshToken);
router.post("/logout", protect, userController.logout);
router.patch("/change-password/:id", protect, userController.changePassword);

// User management routes
router.get("/:id", protect, userController.getUserById);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", protect, userController.deleteUser);

// Admin only routes
router.get("/", protect, userController.getAllUsers);

export default router;