import { Request, Response } from "express";
import * as CategoriesService from "../services/categoriesService";

export const createCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoriesService.createCategories(req.body);
        res.status(201).json({success: true, data: categories});
    } catch (error) {
        res.status(400).json({ success: false, message: (error as Error).message });
    }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoriesService.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Get a single category by ID
export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoriesService.getCategoriesbyId(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

// Update a category by ID
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await CategoriesService.updateCategories(req.params.id, req.body);
    if (!updatedCategory) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

// Delete a category by ID
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await CategoriesService.deleteCategories(req.params.id);
    if (!deletedCategory) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, data: deletedCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};