import Order from "../models/orderModels";
import { IOrderInput } from "../types/orderType";

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

export const getOrderById = async (id: string) => {
  return await Order.findById(id)
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
