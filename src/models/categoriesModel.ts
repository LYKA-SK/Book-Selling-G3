import { Schema, model, Types, Document } from "mongoose";

export interface ICategory extends Document {
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  name: string;
  description?: string;
}

const categorySchema = new Schema<ICategory>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

export const CategoriesModel = model<ICategory>("Category", categorySchema);
