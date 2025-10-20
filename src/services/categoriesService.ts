import { CategoriesModel } from "../models/categoriesModel"; 
import {
    CreateCategoriesInput, UpdateCategoriesInput
} from "../types/categoriesType";
import { Types } from "mongoose";

export const createCategories = async (data: CreateCategoriesInput) => {
    const category = new CategoriesModel(data);
    await category.save();
    return category;
};

export const getCategories = async () => {
    return await CategoriesModel.find();
};

export const getCategoriesbyId = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid category ID");
    }
    return await CategoriesModel.findById(id);
};

export const updateCategories = async (id: string, data: UpdateCategoriesInput) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid category ID");
    }
    return await CategoriesModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategories = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid category ID");
    }
    return await CategoriesModel.findByIdAndDelete(id);
};
