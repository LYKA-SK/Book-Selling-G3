import { Types } from "mongoose";

export interface IOrder {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  orderItems: Types.ObjectId[];
  totalPrice: number;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
