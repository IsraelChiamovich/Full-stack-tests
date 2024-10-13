// src/routes/studentRoutes.ts

import { Router } from 'express';
import { register } from '../controllers/studentController';

const router = Router();

router.post("/register", register);


export default router;
