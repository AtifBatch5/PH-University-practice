"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
router.post('/create-academic-department', 
// validateRequest(
//   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
// ),
academicDepartment_controller_1.AcademicDepartmentControllers.createAcademicDepartmemt);
router.get('/:departmentId', academicDepartment_controller_1.AcademicDepartmentControllers.getSingleAcademicDepartment);
router.patch('/:departmentId', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentControllers.updateAcademicDeartment);
router.get('/', academicDepartment_controller_1.AcademicDepartmentControllers.getAllAcademicDepartments);
exports.AcademicDepartmentRoutes = router;
