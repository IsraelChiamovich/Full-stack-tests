// src/services/authService.ts

import Teacher from "../models/teacherModel";
import Student from "../models/studentModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginUser = async (email: string, password: string) => {
  let user;
  let role;

  user = await Teacher.findOne({ email });
  if (user) {
    role = "teacher";
  } else {
    user = await Student.findOne({ email });
    if (user) {
      role = "student";
    } else {
      throw new Error("User not found"); 
    }
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign(
    { id: user._id, role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return { token };
};
