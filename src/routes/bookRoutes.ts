import { Router } from "express";
import { authorize, protect } from "../middlewares/auth";
import { createBookController, getBooksController } from "../controllers/bookController";
import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
} from "../services/bookService";

const router = Router();

// Public routes (no authentication required)
// Create a new book
router.post("/create-book", async (req, res) => {
  const result = await createBookService(req.body);
  res.status(result.success ? 201 : 400).json(result);
});

// Get all books
router.get("/", async (_req, res) => {
  const result = await getAllBooksService();
  res.status(result.success ? 200 : 400).json(result);
});

router.post("/protected/create", protect, authorize("admin"), createBookController);
router.get("/protected/list", protect, authorize("customer", "admin"), getBooksController);
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



