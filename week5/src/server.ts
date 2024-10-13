// src/server.ts

import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes';
import teacherRoutes from './routes/teacher.routes';
import studentRoutes from './routes/student.routes';
import connectDB from "./config/db";
import { verifyToken } from "./middleware/authMiddleware";
import cookieParser from "cookie-parser";
import swaggerRouter from "./config/swagger";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

connectDB();


app.use('/auth', authRoutes);
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);


app.use(swaggerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
