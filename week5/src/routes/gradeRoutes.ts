// src/routes/gradeRoutes.ts

import { Router } from 'express';
import { authenticateTeacher, authenticateStudent } from '../middlewares/authMiddleware';
import { addGrade, changeGrade, getClassAverage, getStudentGradeForTeacher, getStudentGradeForSelf, getStudentsInfo } from '../controllers/gradeController';

const router = Router();

router.post('/add-grade', authenticateTeacher, addGrade);
router.put('/change-grade', authenticateTeacher, changeGrade);
router.get('/class-average', authenticateTeacher, getClassAverage);
router.get('/students-info', authenticateTeacher, getStudentsInfo);
router.get('/student-grade/:studentId', authenticateTeacher, getStudentGradeForTeacher);
router.get('/student-grade/', authenticateStudent, getStudentGradeForSelf);

export default router;
