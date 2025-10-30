import { Router } from "express";
import * as CategoriesController from "../controllers/categoriesController";
import { protect, authorize } from "../middlewares/auth";

const router = Router();

// Get all categories 🔒 Only logged-in users can view
router.get("/", protect, CategoriesController.getCategories);
router.get("/:id", protect, CategoriesController.getCategory);

// 🔒 Only admin can create, update, delete
router.post("/", protect, authorize("admin"), CategoriesController.createCategories);
router.put("/:id", protect, authorize("admin"), CategoriesController.updateCategory);
router.delete("/:id", protect, authorize("admin"), CategoriesController.deleteCategory);
export default router;  
