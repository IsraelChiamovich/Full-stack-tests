"use strict";
// // src/middlewares/authMiddleware.ts
// import { Request, Response, NextFunction } from "express";
// import Jwt from "jsonwebtoken";
// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
//         if (!token) {
//           res.status(401).json({ message: "Unauthorized" });
//           return;
//         }
//         const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as { author: string };
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
// export const authenticateTeacher = (req: Request, res: Response, next: NextFunction) => {
//   if (req.user.role !== "teacher") {
//     return res.status(403).json({ message: "Unauthorized, teacher only" });
//   }
//   next();
// };
// export const authenticateStudent = (req: Request, res: Response, next: NextFunction) => {
//   if (req.user.role !== "student") {
//     return res.status(403).json({ message: "Unauthorized, student only" });
//   }
//   next();
// };
