"use strict";
// src/routes/gradeRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const gradeController_1 = require("../controllers/gradeController");
const router = (0, express_1.Router)();
router.post('/add-grade', authMiddleware_1.authenticateTeacher, gradeController_1.addGrade);
router.put('/change-grade', authMiddleware_1.authenticateTeacher, gradeController_1.changeGrade);
router.get('/class-average', authMiddleware_1.authenticateTeacher, gradeController_1.getClassAverage);
router.get('/students-info', authMiddleware_1.authenticateTeacher, gradeController_1.getStudentsInfo);
router.get('/student-grade/:studentId', authMiddleware_1.authenticateTeacher, gradeController_1.getStudentGradeForTeacher);
router.get('/student-grade/', authMiddleware_1.authenticateStudent, gradeController_1.getStudentGradeForSelf);
exports.default = router;
