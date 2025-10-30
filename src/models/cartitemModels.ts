import mongoose, { Schema, model, Document, ObjectId } from "mongoose";

// Interface for CartItem data (do NOT include id)
export interface ICartItem {
  cartId: ObjectId;
  bookId: ObjectId;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose Document type
export interface ICartItemDocument extends ICartItem, Document {}

const cartItemSchema = new Schema<ICartItemDocument>(
  {
    cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

export const CartItem = model<ICartItemDocument>("CartItem", cartItemSchema);
