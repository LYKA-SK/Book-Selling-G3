import { Router, Request, Response } from "express";
import bookRoute from "./bookRoutes";
import authRoutes from "./auth"; // Import auth routes

const router = Router();

// Base route
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Readable API 🚀" });
});

// Nested routes
router.use("/books", bookRoute);
router.use("/auth", authRoutes);

export default router;
