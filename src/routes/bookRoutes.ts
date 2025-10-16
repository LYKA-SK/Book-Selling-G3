import express from "express";
import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
} from "../services/bookService";

const router = express.Router();

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
