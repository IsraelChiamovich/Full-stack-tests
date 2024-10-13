// src/server.ts

import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes';
import teacherRoutes from './routes/teacherRoutes';
import studentRoutes from './routes/studentRoutes';
import gradeRoutes from './routes/gradeRoutes';
import connectDB from "./config/db";
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
app.use('/grades', gradeRoutes);


app.use(swaggerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
