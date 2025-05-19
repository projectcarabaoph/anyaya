import express, { Router } from 'express';

import { authMiddleware } from '@middlewares/auth-middleware';
import { createProject, deleteProjectById, getAllProjects, updateProjectById } from '@controllers/project-controllers';

const router: Router = express.Router();

router.post('/create', authMiddleware, createProject)
router.post('/update', authMiddleware, updateProjectById)
router.post('/delete', authMiddleware, deleteProjectById)
router.post('/all', authMiddleware, getAllProjects)

export default router