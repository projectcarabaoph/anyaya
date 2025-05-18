import express, { Router } from 'express';

import { createProject } from '@controllers/project-controllers';

const router: Router = express.Router();

router.post('/create', createProject)

export default router