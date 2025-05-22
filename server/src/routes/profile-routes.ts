import { getProfile } from '@/controllers/profile-controllers'
import { authMiddleware } from '@/middlewares/auth-middleware'
import express, { Router } from 'express'

const router: Router = express.Router()

router.route('/')
    .get(authMiddleware, getProfile)

export default router