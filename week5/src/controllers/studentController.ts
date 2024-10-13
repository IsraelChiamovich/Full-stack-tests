// src/cotrollers/studentController.ts

import { Request, Response } from "express";
import { registerStudent } from "../services/studentService";

const register = async (req: Request, res: Response) => {
  const { name, email, password, className } = req.body;
  try {
    const newStudent = await registerStudent(name, email, password, className);
    res.status(201).json({message: "Student registered and class created successfully",student: newStudent,});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export { register };