import { Router } from "express";

import * as authController from "../controllers/auth";
import { protect } from "../middlewares/auth";

const router = Router();

//Get all authors
router.get("/", protect, authController.getAuthors);
//Get author by ID
router.get("/:id", protect, authController.getAuthorById);
//Create author
router.post("/", protect, authController.createAuthor);
//Update author
router.put("/:id", protect, authController.updateAuthor);
//Delete author
router.delete("/:id", protect, authController.deleteAuthor);

export default router;



