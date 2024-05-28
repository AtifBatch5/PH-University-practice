"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const variantValidationSchema = joi_1.default.object({
    type: joi_1.default.string().trim().required().messages({
        'any.required': 'define the type',
    }),
    value: joi_1.default.string().trim().required().messages({
        'any.required': 'define the value',
    }),
});
const inventoryValidationSchema = joi_1.default.object({
    quantity: joi_1.default.number().integer().min(0).required().messages({
        'any.required': 'product quantity is essential',
        'number.min': 'you cannot put negative values',
    }),
    inStock: joi_1.default.boolean().required().messages({
        'any.required': 'set it to false if 0 or else keep it true',
    }),
});
const KBValidationSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required().messages({
        'any.required': 'give a name of the product',
    }),
    description: joi_1.default.string().trim().min(40).required().messages({
        'any.required': 'need description',
        'string.min': 'description: not less than 40 characters',
    }),
    price: joi_1.default.number().min(0).required().messages({
        'any.required': 'give a price to the product',
        'number.min': 'you cannot give negative value',
    }),
    category: joi_1.default.string().trim().allow('').optional(),
    tags: joi_1.default.array().items(joi_1.default.string().trim()).optional(),
    variants: joi_1.default.array().items(variantValidationSchema).optional(),
    inventory: inventoryValidationSchema.required(),
});
exports.default = KBValidationSchema;
