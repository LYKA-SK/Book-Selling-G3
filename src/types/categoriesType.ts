import { Types } from "mongoose";

// Input type when creating a category
export interface CreateCategoriesInput {
  userId: Types.ObjectId; // the user who creates the category
  // bookId: Types.ObjectId; // the related book
  name: string;
  description?: string;
}

// Input type when updating a category
export interface UpdateCategoriesInput {
  name?: string;
  description?: string;
  // bookId?: Types.ObjectId; // optional if you want to allow changing book
  userId?: Types.ObjectId; // optional if you want to allow changing owner
}
