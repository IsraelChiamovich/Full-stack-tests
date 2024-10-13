"use strict";
// src/services/teacherService.ts
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
exports.registerTeacher = void 0;
const classModel_1 = __importDefault(require("../models/classModel"));
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const registerTeacher = (name, email, password, className) => __awaiter(void 0, void 0, void 0, function* () {
    const existingClass = yield classModel_1.default.findOne({ name: className });
    if (existingClass) {
        throw new Error("Class already exists");
    }
    const newClass = yield classModel_1.default.create({
        name: className,
    });
    classModel_1.default.create(newClass);
    const newTeacher = yield teacherModel_1.default.create({
        name,
        email,
        password,
        class: newClass._id,
    });
    return newTeacher;
});
exports.registerTeacher = registerTeacher;
