import express, { Router } from 'express';

import { callbackToken, refreshToken, signInWithEmail, signInWithOauth, verifyOtpToken } from '@controllers/auth-controllers'

const router: Router = express.Router();

router.post('/sign-in/email', signInWithEmail)
router.post('/sign-in/oauth', signInWithOauth)
router.post('/sign-in/verify', verifyOtpToken)
router.post('/sign-in/callback', callbackToken)
router.post('/sign-in/refresh', refreshToken)

export default router