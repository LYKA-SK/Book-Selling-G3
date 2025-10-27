import mongoose, { Schema, model } from "mongoose";
import { IOrderItem } from "../types/orderItemType";

// const orderItemSchema = new Schema<IOrderItem>(
//   {
//     book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
//     order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
//     quantity: { type: Number, required: true },
//     sellPrice: { type: Number, required: true },
//     totalPrice: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

const orderItemSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
});

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);
