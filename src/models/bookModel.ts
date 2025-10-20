import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    stock: { type: Number, default: 0 },
    imageUrl: { type: String },
    pages: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model("Book", bookSchema);
