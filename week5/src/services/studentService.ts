// src/services/studentService.ts

import Class, { IClass } from "../models/classModel";
import Student, { IStudent } from "../models/studentModel";

const registerStudent = async (name: string, email: string, password: string, className: string) => {
  const theClass = await Class.findOne({ name: className });
  if (!theClass) throw new Error("Class does not exist");

  const newStudent = await Student.create({ name, email, password, class: theClass._id });
  await Class.findByIdAndUpdate(theClass._id, { $push: { students: newStudent._id } });

  return newStudent;
};


export { registerStudent };
