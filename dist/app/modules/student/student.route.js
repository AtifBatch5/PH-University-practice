"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_controller_1 = require("./student.controller");
const student_validation_1 = require("./student.validation");
const router = express_1.default.Router();
router.get('/', student_controller_1.StudentControllers.getAllStudents);
router.get('/:id', student_controller_1.StudentControllers.getSingleStudent);
router.patch('/:id', (0, validateRequest_1.default)(student_validation_1.updateStudentValidationSchema), student_controller_1.StudentControllers.updateStudent);
router.delete('/:id', student_controller_1.StudentControllers.deleteStudent);
exports.StudentRoutes = router;
