"use strict";
// src/srvices/gradeService.ts
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
exports.getStudentsInfoService = exports.getStudentGradesForSelfService = exports.getStudentGradesForTeacherService = exports.getClassAverageService = exports.changeGradeService = exports.addGradeService = void 0;
const classModel_1 = __importDefault(require("../models/classModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const mongoose_1 = require("mongoose");
const findClass = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield classModel_1.default.findOne({ teacher: teacherId });
    if (!classInfo)
        throw new Error("Class not found");
    return classInfo;
});
const addGradeService = (teacherId, studentId, subject, grade) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield findClass(teacherId);
    if (!classInfo.students.includes(studentId))
        throw new Error("Student not found in class");
    return yield studentModel_1.default.findByIdAndUpdate(studentId, { $push: { grades: { subject, grade } } }, { new: true });
});
exports.addGradeService = addGradeService;
const changeGradeService = (teacherId, studentId, subject, newGrade) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield findClass(teacherId);
    if (!classInfo.students.includes(new mongoose_1.Types.ObjectId(studentId)))
        throw new Error("Student not found in class");
    return yield studentModel_1.default.findOneAndUpdate({ _id: studentId, 'grades.subject': subject }, { $set: { 'grades.$.grade': newGrade } }, { new: true });
});
exports.changeGradeService = changeGradeService;
const getClassAverageService = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield findClass(teacherId);
    const students = yield studentModel_1.default.find({ class: classInfo._id });
    if (!students.length)
        throw new Error("No students found in class");
    const totalGrades = students.flatMap(student => student.grades).reduce((sum, grade) => sum + grade.grade, 0);
    const countGrades = students.flatMap(student => student.grades).length;
    if (!countGrades)
        throw new Error("No grades available");
    return totalGrades / countGrades;
});
exports.getClassAverageService = getClassAverageService;
const getStudentGradesForTeacherService = (teacherId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield findClass(teacherId);
    if (!classInfo.students.includes(new mongoose_1.Types.ObjectId(studentId)))
        throw new Error("Student not found in class");
    return yield studentModel_1.default.findById(studentId).populate('grades');
});
exports.getStudentGradesForTeacherService = getStudentGradesForTeacherService;
const getStudentGradesForSelfService = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield studentModel_1.default.findById(studentId).populate('grades');
});
exports.getStudentGradesForSelfService = getStudentGradesForSelfService;
const getStudentsInfoService = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const classInfo = yield classModel_1.default.findOne({ teacher: teacherId }).populate('students');
    if (!classInfo)
        throw new Error("Class not found");
    const students = yield studentModel_1.default.find({ class: classInfo._id }).populate('class grades');
    if (!students.length)
        throw new Error("No students found in class");
    return students;
});
exports.getStudentsInfoService = getStudentsInfoService;
