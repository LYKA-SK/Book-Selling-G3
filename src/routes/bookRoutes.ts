import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { createBookController, getBooksController } from "../controllers/bookController";
import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
} from "../services/bookService";

const router = Router();

// Admin-only: Create a new book
router.post("/admin/books", protect(["admin"]), createBookController);

// Customer & Admin: Get all books
router.get("/books", protect(["customer", "admin"]), getBooksController);
router.post("/", async (req, res) => {
  const result = await createBookService(req.body);
  res.status(result.success ? 201 : 400).json(result);
});

router.get("/", async (_req, res) => {
  const result = await getAllBooksService();
  res.status(result.success ? 200 : 400).json(result);
});

router.get("/:id", async (req, res) => {
  const result = await getBookByIdService(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

router.put("/:id", async (req, res) => {
  const result = await updateBookService(req.params.id, req.body);
  res.status(result.success ? 200 : 404).json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await deleteBookService(req.params.id);
  res.status(result.success ? 200 : 404).json(result);
});

export default router;
