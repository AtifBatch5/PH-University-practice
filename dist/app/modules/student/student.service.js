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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const student_constant_1 = require("./student.constant");
const student_model_1 = require("./student.model");
const getAllStudentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object
     
    let searchTerm = '';   // SET DEFAULT VALUE
  
    // IF searchTerm  IS GIVEN SET IT
    if (query?.searchTerm) {
      searchTerm = query?.searchTerm as string;
    }
  
    
   // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  :
    { email: { $regex : query.searchTerm , $options: i}}
    { presentAddress: { $regex : query.searchTerm , $options: i}}
    { 'name.firstName': { $regex : query.searchTerm , $options: i}}
  
    
    // WE ARE DYNAMICALLY DOING IT USING LOOP
     const searchQuery = Student.find({
       $or: studentSearchableFields.map((field) => ({
         [field]: { $regex: searchTerm, $options: 'i' },
      })),
     });
  
    
     // FILTERING fUNCTIONALITY:
    
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
     excludeFields.forEach((el) => delete queryObj[el]);  // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY
  
    const filterQuery = searchQuery
      .find(queryObj)
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      });
  
   
    // SORTING FUNCTIONALITY:
    
    let sort = '-createdAt'; // SET DEFAULT VALUE
   
   // IF sort  IS GIVEN SET IT
    
     if (query.sort) {
      sort = query.sort as string;
    }
  
     const sortQuery = filterQuery.sort(sort);
  
  
     // PAGINATION FUNCTIONALITY:
  
     let page = 1; // SET DEFAULT VALUE FOR PAGE
     let limit = 1; // SET DEFAULT VALUE FOR LIMIT
     let skip = 0; // SET DEFAULT VALUE FOR SKIP
  
  
    // IF limit IS GIVEN SET IT
    
    if (query.limit) {
      limit = Number(query.limit);
    }
  
    // IF page IS GIVEN SET IT
  
    if (query.page) {
      page = Number(query.page);
      skip = (page - 1) * limit;
    }
  
    const paginateQuery = sortQuery.skip(skip);
  
    const limitQuery = paginateQuery.limit(limit);
  
    
    
    // FIELDS LIMITING FUNCTIONALITY:
  
    // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH
  
    fields: 'name,email'; // WE ARE ACCEPTING FROM REQUEST
    fields: 'name email'; // HOW IT SHOULD BE
  
    let fields = '-__v'; // SET DEFAULT VALUE
  
    if (query.fields) {
      fields = (query.fields as string).split(',').join(' ');
  
    }
  
    const fieldQuery = await limitQuery.select(fields);
  
    return fieldQuery;
  
    */
    const studentQuery = new QueryBuilder_1.default(student_model_1.Student.find()
        .populate('user')
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    }), query)
        .search(student_constant_1.studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield studentQuery.modelQuery;
    return result;
});
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate('admissionSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    });
    return result;
});
const updateStudentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    /*
      guardain: {
        fatherOccupation:"Teacher"
      }
  
      guardian.fatherOccupation = Teacher
  
      name.firstName = 'Mezba'
      name.lastName = 'Abedin'
    */
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    const result = yield student_model_1.Student.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.Student.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete student');
        }
        // get user _id from deletedStudent
        const userId = deletedStudent.user;
        const deletedUser = yield user_model_1.User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete user');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to delete student');
    }
});
exports.StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentIntoDB,
    deleteStudentFromDB,
};
