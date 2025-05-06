import express, { Router } from 'express';

import { signInWithEmail, signInWithOauth } from '@controllers/auth-controllers'

const router: Router = express.Router();


router.post('/sign-in/email', signInWithEmail)
router.post('/sign-in/oauth', signInWithOauth)


export default router