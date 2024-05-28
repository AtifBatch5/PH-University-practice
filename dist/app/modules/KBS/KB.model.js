"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KBModel = void 0;
const mongoose_1 = require("mongoose");
const varriantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, 'define the type'],
        trim: true,
    },
    value: {
        type: String,
        required: [true, 'define the value'],
        trim: true,
    },
}, { _id: false });
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, 'product quanitity is essential'],
        min: [0, 'you cannot put negetive values'],
        trim: true,
    },
    inStock: {
        type: Boolean,
        required: [true, 'set it to false if 0 or else keep it true'],
        trim: true,
    },
}, { _id: false });
const KBSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'give a name of the product'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'need description'],
        minlength: [40, 'description: not less than 40 characters'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'give a price to the product'],
        min: [0, 'you cannot give negetive value'],
        trim: true,
    },
    category: {
        type: String,
        trim: true,
    },
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    variants: [varriantSchema],
    inventory: inventorySchema,
});
exports.KBModel = (0, mongoose_1.model)('kbs', KBSchema);
