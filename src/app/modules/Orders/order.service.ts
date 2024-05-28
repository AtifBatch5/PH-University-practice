import express from 'express';
import { order } from './order.interface';
import { orderModel } from './order.model';
const router = express.Router();

const createORDERinDB = async (order: order) => {
  const result = await orderModel.create(order);
  return result;
};

const getAllORDERSFromDB = async () => {
  const result = await orderModel.find();
  return result;
};

const searchOrderFromDB = async (givenEmail: string) => {
  let result = await orderModel.find({
    email: { $regex: givenEmail, $options: 'i' },
  });

  console.log(result);
  return result;
};

export const orderServices = {
  createORDERinDB,
  getAllORDERSFromDB,
  searchOrderFromDB,
};
