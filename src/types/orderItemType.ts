import { Types } from "mongoose";

export interface IOrderItem {
  _id?: Types.ObjectId;
  book: Types.ObjectId;
  order: Types.ObjectId;
  quantity: number;
  sellPrice: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
