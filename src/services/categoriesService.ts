import { CategoriesModel } from "../models/categoriesModel"; 
import {
    CreateCategoriesInput, UpdateCategoriesInput
} from "../types/categoriesType";
import { Types } from "mongoose";

export const createCategories = async (data: CreateCategoriesInput) => {
    const { userId, bookId, name, description } = data;

    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(bookId)) {
        throw new Error("Invalid userId or bookId");
    }

    const category = new CategoriesModel({
        userId,
        bookId,
        name,
        description,
    });

    await category.save();
    return category;
};

// Get all categories
export const getCategories = async () => {
    return await CategoriesModel.find();
};

// Get a single category by ID
export const getCategoriesbyId = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid category ID");
    }
    return await CategoriesModel.findById(id);
};

// Update a category by ID
export const updateCategories = async (id: string, data: UpdateCategoriesInput) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid category ID");
    }
    return await CategoriesModel.findByIdAndUpdate(id, data, { new: true });
};

// Delete a category by ID
export const deleteCategories = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid category ID");
    }
    return await CategoriesModel.findByIdAndDelete(id);
};
