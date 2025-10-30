import { Schema, model } from "mongoose";
import { IAuthor } from "../types/authTypes";

const authorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, // sparse allows multiple nulls
  phone: { type: String },
  dob: { type: Date },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }]
}, { timestamps: true });

export default model<IAuthor>("Author", authorSchema);

