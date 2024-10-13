// src/routes/teacherRoutes.ts

import { Router } from 'express';
import { register } from '../controllers/teacherController';

const router = Router();

router.post('/register', register);

export default router;
