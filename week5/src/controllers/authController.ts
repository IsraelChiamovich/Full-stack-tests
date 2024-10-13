// src/controllers/authController.ts

import { Request, Response } from "express";
import { loginUser } from "../services/authService";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials", error });
  }
};

export { login };
