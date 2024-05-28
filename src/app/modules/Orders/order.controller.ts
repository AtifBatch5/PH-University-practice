import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { KBModel } from '../KBS/KB.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await orderServices.createORDERinDB(orderData);
    const wantedQuantity = result.quantity;
    const keyboard = await KBModel.findById(result.productId);
    if (!keyboard) {
      return res
        .status(404)
        .json({ success: false, message: 'Keyboard not found' });
    }
    if (result.quantity > keyboard.inventory.quantity) {
      return res.status(404).json({
        success: false,
        message: 'Insufficient quantity of the product in inventory',
      });
    } else {
      keyboard.inventory.quantity -= wantedQuantity;
      if (keyboard.inventory.quantity === 0) {
        keyboard.inventory.inStock = false;
      } else {
        keyboard.inventory.inStock = true;
      }
      await keyboard.save();

      res.status(200).json({
        success: true,
        message: 'order is created successfully',
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      succss: false,
      message: 'failed to create order :(',
      error: err
    });
  }
};

const getAllOrFilteredOrders = async (req: Request, res: Response) => {
  if (Object.keys(req.query).length === 0) {
    try {
      const result = await orderServices.getAllORDERSFromDB();
      res.status(200).json({
        success: true,
        message: 'orders shown successfully',
        data: result,
      });
    } catch (err) {
      
      res.status(400).json({
        succss: false,
        message: 'failed to get orders :(',
      });
    }
  } else {
    try {
      const givenEmail: string = req.query.email as string;
      let result = await orderServices.searchOrderFromDB(givenEmail);
      if (result.length === 0) {
        res.status(200).json({
          success: false,
          message: `email not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Orders matching the email ${givenEmail} found successfully!`,
          data: result,
        });
      }
    } catch (err) {
      res.status(400).json({
        succss: false,
        message: 'failed to get email :(',
      });
    }
  }
};

export const orderControllers = {
  createOrder,
  getAllOrFilteredOrders,
};
