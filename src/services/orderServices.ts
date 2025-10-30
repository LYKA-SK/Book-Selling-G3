import { Order } from "../models/orderModels";

export interface IOrderInput {
  userId: string;
  orderItemId: string[];
  totalAmount: number;
  status: string;
}

export const createOrder = async (data: IOrderInput) => {
  return await Order.create(data);
};

export const getAllOrders = async () => {
  return await Order.find()
    .populate({
      path: "orderItemId",
      populate: { path: "bookId" },
    })
    .populate("userId");
};

export const updateOrderStatus = async (id: string, status: string) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteOrder = async (id: string) => {
  return await Order.findByIdAndDelete(id);
};
