"use strict";
// src/services/studentService.ts
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
exports.registerStudent = void 0;
const classModel_1 = __importDefault(require("../models/classModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const registerStudent = (name, email, password, className) => __awaiter(void 0, void 0, void 0, function* () {
    const theClass = yield classModel_1.default.findOne({ name: className });
    if (!theClass)
        throw new Error("Class does not exist");
    const newStudent = yield studentModel_1.default.create({ name, email, password, class: theClass._id });
    yield classModel_1.default.findByIdAndUpdate(theClass._id, { $push: { students: newStudent._id } });
    return newStudent;
});
exports.registerStudent = registerStudent;
