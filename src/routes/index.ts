import { Router } from "express";
import bookRoute from "./bookRoutes";
import authRoutes from "./auth"; // Import auth routes

const router = Router();

// Base route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Readable API 🚀" });
});

// Nested routes
router.use("/books", bookRoute);
router.use("/auth", authRoutes);

export default router;
