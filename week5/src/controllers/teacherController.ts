// src/ controllers/teacherController.ts

import { Request, Response } from "express";
import { registerTeacher } from "../services/teacherService";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, className } = req.body;
  try {
    const newTeacher = await registerTeacher(name, email, password, className);
    res.status(201).json({ message: "Teacher registered and class created successfully", teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
