"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KBRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const KB_controller_1 = require("./KB.controller");
router.post('/', KB_controller_1.KBControllers.createKB);
router.get('/', KB_controller_1.KBControllers.getAllOrSearchedKBs);
router.get('/:id', KB_controller_1.KBControllers.getOneKB);
router.put('/:id', KB_controller_1.KBControllers.UpdateKB);
router.delete('/:id', KB_controller_1.KBControllers.deleteKB);
exports.KBRoutes = router;
