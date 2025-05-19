import express, { Router } from 'express';

import { authMiddleware } from '@middlewares/auth-middleware';
import { createProject, deleteProjectById, getAllProjects, getProjectById, updateProjectById } from '@controllers/project-controllers';

const router: Router = express.Router();

router.post('/create', authMiddleware, createProject)
router.post('/update', authMiddleware, updateProjectById)
router.post('/delete/:id', authMiddleware, deleteProjectById)
router.post('/get/all', authMiddleware, getAllProjects)
router.post('/get/:id', authMiddleware, getProjectById)


export default router