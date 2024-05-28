"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const KB_route_1 = require("./app/modules/KBS/KB.route");
const order_route_1 = require("./app/modules/Orders/order.route");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application
app.use('/api/products', KB_route_1.KBRoutes);
app.use('/api/orders', order_route_1.orderRoutes);
const home = (req, res) => {
    res.send('WOHOOOOO HIIII <33333');
};
app.get('/', home);
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'route not found',
    });
});
exports.default = app;
