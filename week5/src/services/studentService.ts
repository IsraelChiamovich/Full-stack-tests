// src/services/studentService.ts

import { Types } from "mongoose";
import Class from "../models/classModel";
import Student from "../models/studentModel";

export const registerStudent = async (name: string, email: string, password: string, className: string) => {
  const theClass = await Class.findOne({ name: className });
  if (!theClass) throw new Error("Class does not exist");
  const newStudent = await Student.create({ name, email, password, class: theClass._id });
  await Class.findByIdAndUpdate(theClass._id, { $push: { students: newStudent._id } });
  return newStudent;
};

