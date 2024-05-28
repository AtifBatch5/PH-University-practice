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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KBControllers = void 0;
const KB_service_1 = require("./KB.service");
const KB_validation_1 = __importDefault(require("./KB.validation"));
const createKB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const KBData = req.body;
        const { error } = KB_validation_1.default.validate(KBData);
        const result = yield KB_service_1.KBServices.createKBinDB(KBData);
        if (error) {
            res.status(400).json({
                success: false,
                message: 'Something is wrong :(',
                error: error.details,
            });
        }
        res.status(200).json({
            success: true,
            message: 'KB is created successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            succss: false,
            message: 'failed to create data :(',
            error: err,
        });
    }
});
const getAllOrSearchedKBs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.query).length === 0) {
        try {
            const result = yield KB_service_1.KBServices.getAllKBsFromDB();
            res.status(200).json({
                success: true,
                message: 'KBs shown successfully',
                data: result,
            });
        }
        catch (err) {
            res.status(400).json({
                succss: false,
                message: 'failed to get data :(',
            });
        }
    }
    else {
        try {
            const searchTerm = req.query.searchTerm;
            let result = yield KB_service_1.KBServices.searchKBFromDB(searchTerm);
            if (result.length === 0) {
                res.status(400).json({
                    succss: false,
                    message: 'Searched item is not found',
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: `keyboard Products matching the term ${searchTerm} found successfully!`,
                    data: result,
                });
            }
            if (!searchTerm) {
                res.status(400).json({
                    succss: false,
                    message: 'Search Term is missing in the searchTerm query field',
                });
            }
        }
        catch (err) {
            res.status(400).json({
                succss: false,
                message: 'failed to get data :(',
            });
        }
    }
});
const getOneKB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const KBId = req.params.id;
        const result = yield KB_service_1.KBServices.getOneKBFromDB(KBId);
        if (result === null) {
            res.status(400).json({
                success: false,
                message: 'specific KB not found :(',
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'specific KB shown successfully',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(400).json({
            succss: false,
            message: 'failed to get data :(',
        });
    }
});
const deleteKB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const KBId = req.params.id;
        const result = yield KB_service_1.KBServices.deleteOneKBFromDB(KBId);
        if (result.deletedCount === 0) {
            res.status(400).json({
                success: false,
                message: 'specific KB not found',
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'specific KB Deleted successfully',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(400).json({
            succss: false,
            message: 'failed to delete data :(',
        });
    }
});
const UpdateKB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedKB = req.body;
        const result = yield KB_service_1.KBServices.updateKBFromDB(id, updatedKB);
        if (result === null) {
            res.status(400).json({
                success: false,
                message: 'specific KB not found :(',
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'specific KB updated successfully',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(400).json({
            succss: false,
            message: 'failed to update data :(',
        });
    }
});
exports.KBControllers = {
    createKB,
    getAllOrSearchedKBs,
    getOneKB,
    deleteKB,
    UpdateKB,
};
