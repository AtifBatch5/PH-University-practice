"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemester = void 0;
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const acdemicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.AcademicSemesterName,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.AcademicSemesterCode,
    },
    startMonth: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.Months,
    },
    endMonth: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.Months,
    },
}, {
    timestamps: true,
});
acdemicSemesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterExists = yield exports.AcademicSemester.findOne({
            year: this.year,
            name: this.name,
        });
        if (isSemesterExists) {
            throw new Error('Semester is already exists !');
        }
        next();
    });
});
exports.AcademicSemester = (0, mongoose_1.model)('AcademicSemester', acdemicSemesterSchema);
// Name Year
//2030 Autumn => Created
// 2031 Autumn
//2030 Autumn => XXX
//2030 Fall => Created
// Autumn 01
// Summar 02
// Fall 03
