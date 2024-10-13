// // src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (token: string | undefined) => token ? jwt.verify(token, process.env.JWT_SECRET!) : null;

const authenticate = (role: string) => (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
     res.status(401).json({ message: "Unauthorized" });
     return;
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded || (decoded as any).role !== role) {
     res.status(403).json({ message: "Access forbidden" });
     return;
    }
    req.body.user = decoded;
    next();
  } catch (error) {
     res.status(401).json({ message: "Invalid token", error });
     return;
  }
};

export const authenticateTeacher = authenticate("teacher");
export const authenticateStudent = authenticate("student");
