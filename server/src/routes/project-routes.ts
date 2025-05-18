import express, { Router } from 'express';

import { createProject, updateProjectById } from '@controllers/project-controllers';
import { authMiddleware } from '@middlewares/auth-middleware';

const router: Router = express.Router();

router.post('/create', authMiddleware, createProject)
router.post('/update', authMiddleware, updateProjectById)
export default router