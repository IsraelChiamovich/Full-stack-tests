"use strict";
// src/controllers/gradeController.ts
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
exports.getStudentsInfo = exports.getStudentGradeForSelf = exports.getStudentGradeForTeacher = exports.getClassAverage = exports.changeGrade = exports.addGrade = void 0;
const gradeSevice_1 = require("../services/gradeSevice");
const addGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, subject, grade } = req.body;
        const teacherId = req.body.user.id;
        const newGrade = yield (0, gradeSevice_1.addGradeService)(teacherId, studentId, subject, grade);
        res.status(201).json({ message: "Grade added successfully", grade: newGrade });
    }
    catch (error) {
        res.status(500).json({ message: "Add grade error", error });
    }
});
exports.addGrade = addGrade;
const changeGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, subject, grade } = req.body;
        const teacherId = req.body.user.id;
        const updatedStudent = yield (0, gradeSevice_1.changeGradeService)(teacherId, studentId, subject, grade);
        res.status(200).json({ message: "Grade updated successfully", student: updatedStudent });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.changeGrade = changeGrade;
const getClassAverage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacherId = req.body.user.id;
        const average = yield (0, gradeSevice_1.getClassAverageService)(teacherId);
        res.status(200).json({ message: "Class average calculated successfully", average });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getClassAverage = getClassAverage;
const getStudentGradeForTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const teacherId = req.body.user.id;
        const student = yield (0, gradeSevice_1.getStudentGradesForTeacherService)(teacherId, studentId);
        res.status(200).json({ student });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getStudentGradeForTeacher = getStudentGradeForTeacher;
const getStudentGradeForSelf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.body.user.id;
        const student = yield (0, gradeSevice_1.getStudentGradesForSelfService)(studentId);
        res.status(200).json({ student });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getStudentGradeForSelf = getStudentGradeForSelf;
const getStudentsInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacherId = req.body.user.id;
        const students = yield (0, gradeSevice_1.getStudentsInfoService)(teacherId);
        res.status(200).json({ students });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getStudentsInfo = getStudentsInfo;
