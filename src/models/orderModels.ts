import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: string;
  orderItems: { book: string; quantity: number; price: number }[];
  totalPrice: number;
  status: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: String, required: true },
    orderItems: [
      {
        book: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
