import { Schema, model } from 'mongoose';
import { order } from './order.interface';
import validator from 'validator';

const KBSchema = new Schema<order>({
  email: {
    type: String,
    required: [true, 'email is important'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value), message: "you need to give a valid email"
    },
  },
  productId: {
    type: String,
    required: [true, 'give your product id'],
    trim: true,
  },
  // I did not give price as price was really not needed the productid should be enough because every kb has it's own price
  quantity: {
    type: Number,
    required: [true, 'give your quantity'],
    min: [0, "you can't give negetive values"],
    trim: true,
  },
});

export const orderModel = model<order>('orders', KBSchema);
