import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
  },
  { timestamps: true } // adds createdAt and updatedAt
);

export const Cart = model("Cart", cartSchema);
