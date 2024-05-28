"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const KBSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'email is important'],
        trim: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value), message: "you need to give a valid email"
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
exports.orderModel = (0, mongoose_1.model)('orders', KBSchema);
