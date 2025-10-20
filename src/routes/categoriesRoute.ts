import { Router } from "express";
import * as CategoriesController from "../controllers/categoriesController";

const router = Router();

// Create a new category
router.post("/", CategoriesController.createCategories);

// Get all categories
router.get("/", CategoriesController.getCategories);

// Get a single category by ID
router.get("/:id", CategoriesController.getCategory);

// Update a category by ID
router.put("/:id", CategoriesController.updateCategory);

// Delete a category by ID
router.delete("/:id", CategoriesController.deleteCategory);

export default router;  
