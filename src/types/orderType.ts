import { Types } from "mongoose";

export interface IOrderInput {
  userId: Types.ObjectId;
  orderItemId?: Types.ObjectId[]; // optional when creating order first
}

export interface IOrderResponse {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  orderItemId: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
