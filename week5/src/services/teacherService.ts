// src/services/teacherService.ts

import Class from "../models/classModel";
import Teacher from "../models/teacherModel";

export const registerTeacher = async (name: string, email: string, password: string, className: string) => {
  if (await Class.findOne({ name: className })) throw new Error("Class already exists");

  const newClass = await Class.create({ name: className });
  const newTeacher = await Teacher.create({ name, email, password, class: newClass._id });
  
  await Class.findByIdAndUpdate(newClass._id, { teacher: newTeacher._id });

  return newTeacher;
};
