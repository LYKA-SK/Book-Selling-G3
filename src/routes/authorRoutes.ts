// src/routes/author.routes.ts
import { Router } from "express";
import { AuthorController } from "../controllers/authorController";

const router = Router();

// Create a new author
router.post("/", AuthorController.createAuthor);

// Get all authors
router.get("/", AuthorController.getAllAuthors);

// Get author by ID
router.get("/:id", AuthorController.getAuthorById);

// Update author by ID
router.put("/:id", AuthorController.updateAuthor);

// Delete author by ID
router.delete("/:id", AuthorController.deleteAuthor);

export default router;
