import express, { Router } from 'express';

import { authMiddleware } from '@/middlewares/auth-middleware';

import {
    createProject,
    deleteProjectById,
    getAllProjects,
    getProjectById,
    updateProjectById
} from '@/controllers/project-controllers';

const router: Router = express.Router();

router.route("/")
    .post(authMiddleware, createProject)
    .get(authMiddleware, getAllProjects);

router.route("/:id")
    .get(authMiddleware, getProjectById)
    .put(authMiddleware, updateProjectById)
    .delete(authMiddleware, deleteProjectById)


export default router