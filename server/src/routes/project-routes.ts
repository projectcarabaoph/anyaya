import express, { Router } from 'express';

import { createProject } from '@controllers/project-controllers';
import { authMiddleware } from '@middlewares/auth-middleware';

const router: Router = express.Router();

router.post('/create', authMiddleware, createProject)

export default router