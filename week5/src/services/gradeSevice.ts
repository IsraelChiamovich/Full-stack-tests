// src/srvices/gradeService.ts

import Class from "../models/classModel";
import Student from "../models/studentModel";
import { Types } from "mongoose";

const findClass = async (teacherId: string) => {
  const classInfo = await Class.findOne({ teacher: teacherId });
  if (!classInfo) throw new Error("Class not found");
  return classInfo;
};

const addGradeService = async (teacherId: string, studentId: Types.ObjectId, subject: string, grade: number) => {
  const classInfo = await findClass(teacherId);
  if (!classInfo.students.includes(studentId)) throw new Error("Student not found in class");

  return await Student.findByIdAndUpdate(studentId, { $push: { grades: { subject, grade } } }, { new: true });
};

const changeGradeService = async (teacherId: string, studentId: string, subject: string, newGrade: number) => {
  const classInfo = await findClass(teacherId);
  if (!classInfo.students.includes(new Types.ObjectId(studentId))) throw new Error("Student not found in class");

  return await Student.findOneAndUpdate({ _id: studentId, 'grades.subject': subject }, { $set: { 'grades.$.grade': newGrade } }, { new: true });
};

const getClassAverageService = async (teacherId: string) => {
  const classInfo = await findClass(teacherId);
  const students = await Student.find({ class: classInfo._id });
  if (!students.length) throw new Error("No students found in class");

  const totalGrades = students.flatMap(student => student.grades).reduce((sum, grade) => sum + grade.grade, 0);
  const countGrades = students.flatMap(student => student.grades).length;

  if (!countGrades) throw new Error("No grades available");
  return totalGrades / countGrades;
};

const getStudentGradesForTeacherService = async (teacherId: string, studentId: string) => {
  const classInfo = await findClass(teacherId);
  if (!classInfo.students.includes(new Types.ObjectId(studentId))) throw new Error("Student not found in class");

  return await Student.findById(studentId).populate('grades');
};

const getStudentGradesForSelfService = async (studentId: string) => {
  return await Student.findById(studentId).populate('grades');
};

const getStudentsInfoService = async (teacherId: string) => {
    const classInfo = await Class.findOne({ teacher: teacherId }).populate('students');
    if (!classInfo) throw new Error("Class not found");
    const students = await Student.find({ class: classInfo._id }).populate('grades');
    if (!students.length) throw new Error("No students found in class");
    return students;
  };
  
  

export {addGradeService, changeGradeService, getClassAverageService, getStudentGradesForTeacherService, getStudentGradesForSelfService, getStudentsInfoService};