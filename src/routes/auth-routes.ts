import express, { Router } from 'express';

import { signInWithEmail } from '@controllers/auth-controllers'

const router: Router = express.Router();


router.post('/sign-in/email', signInWithEmail)

export default router