"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KBModel = void 0;
const mongoose_1 = require("mongoose");
const KBSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [{ type: String, value: String }], required: true },
    inventory: { quantity: Number, inStock: Boolean }
});
exports.KBModel = (0, mongoose_1.model)('student', KBSchema);
