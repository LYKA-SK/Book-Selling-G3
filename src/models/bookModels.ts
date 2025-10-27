// import { Schema, model } from "mongoose";

// const bookSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     author: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String },
//     category: { type: Schema.Types.ObjectId, ref: "Category" },
//     stock: { type: Number, default: 0 },
//     imageUrl: { type: String },
//     pages: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// export default model("Book", bookSchema);

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  basePrice: Number,
  sellPrice: Number,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  stock: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imageUrl: String,
  page: Number,
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
