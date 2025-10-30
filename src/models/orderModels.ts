import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItemId: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
