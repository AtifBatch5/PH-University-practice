import Joi from 'joi';
import { KB, variant, inventory } from './KB.interface';

const variantValidationSchema = Joi.object<variant>({
  type: Joi.string().trim().required().messages({
    'any.required': 'define the type',
  }),
  value: Joi.string().trim().required().messages({
    'any.required': 'define the value',
  }),
});

const inventoryValidationSchema = Joi.object<inventory>({
  quantity: Joi.number().integer().min(0).required().messages({
    'any.required': 'product quantity is essential',
    'number.min': 'you cannot put negative values',
  }),
  inStock: Joi.boolean().required().messages({
    'any.required': 'set it to false if 0 or else keep it true',
  }),
});

const KBValidationSchema = Joi.object<KB>({
  name: Joi.string().trim().required().messages({
    'any.required': 'give a name of the product',
  }),
  description: Joi.string().trim().min(40).required().messages({
    'any.required': 'need description',
    'string.min': 'description: not less than 40 characters',
  }),
  price: Joi.number().min(0).required().messages({
    'any.required': 'give a price to the product',
    'number.min': 'you cannot give negative value',
  }),
  category: Joi.string().trim().allow('').optional(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
  variants: Joi.array().items(variantValidationSchema).optional(),
  inventory: inventoryValidationSchema.required(),
});

export default KBValidationSchema;
