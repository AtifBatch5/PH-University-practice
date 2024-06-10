"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("../Admin/admin.validation");
const faculty_validation_1 = require("../Faculty/faculty.validation");
const student_validation_1 = require("./../student/student.validation");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.default)(student_validation_1.createStudentValidationSchema), user_controller_1.UserControllers.createStudent);
router.post('/create-faculty', (0, validateRequest_1.default)(faculty_validation_1.createFacultyValidationSchema), user_controller_1.UserControllers.createFaculty);
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
exports.UserRoutes = router;
