import express, { Router } from 'express';

import {
    signInWithEmail,
    signInWithOauth,
    verifyOtpToken,
    callbackToken,
    refreshToken,
    signOut
} from '@controllers/auth-controllers'

const router: Router = express.Router();

router.post('/sign-in/email', signInWithEmail)
router.post('/sign-in/oauth', signInWithOauth)
router.post('/sign-in/verify', verifyOtpToken)
router.post('/sign-in/callback', callbackToken)
router.post('/sign-in/refresh', refreshToken)
router.post('/sign-out', signOut)


export default router