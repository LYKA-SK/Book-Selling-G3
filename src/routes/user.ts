import { Router } from "express";
import userController from "../controllers/userController";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected routes
router.get("/profile", authMiddleware, userController.getProfile);
router.post("/refresh-token", authMiddleware, userController.refreshToken);
router.post("/logout", authMiddleware, userController.logout);
router.patch("/change-password/:id", authMiddleware, userController.changePassword);

// User management routes
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

// Admin only routes
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);

export default router;