import { Router } from "express";
import { createBookController, getBooksController } from "../controllers/bookController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

// Admin-only: Create a new book
router.post("/admin/books", protect(["admin"]), createBookController);

// Buyer & Admin: Get all books
router.get("/books", protect(["buyer", "admin"]), getBooksController);

export default router;
