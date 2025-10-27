// import { Schema, model } from "mongoose";
// import { IOrder } from "../types/orderType";

// const orderSchema = new Schema<IOrder>(
//   {
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     orderItems: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
//     totalPrice: { type: Number, required: true },
//     status: {
//       type: String,
//       enum: ["pending", "paid", "shipped", "completed", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export default model<IOrder>("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model("Order", orderSchema);
