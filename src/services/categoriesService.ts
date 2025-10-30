import { CategoriesModel } from "../models/categoriesModel"; 
import {
    CreateCategoriesInput, UpdateCategoriesInput
} from "../types/categoriesType";
import { Types } from "mongoose";

export const createCategories = async (data: CreateCategoriesInput) => {
    const { userId, name, description } = data;

    if (!Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId");
    }

    const category = new CategoriesModel({
        userId,
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
