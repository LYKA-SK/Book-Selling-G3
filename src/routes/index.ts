import { Router } from "express";
import bookRoute from "./bookRoutes";
import authRoutes from "./auth"; // Import auth routes
import categories from "./categoriesRoute";

const router = Router();

// Base route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Readable API 🚀" });
});

// Nested routes
router.use("/books", bookRoute);
router.use("/auth", authRoutes);
router.use("/categories", categories);
// router.use("/categories", require)

export default router;
