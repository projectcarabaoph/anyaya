import Express from 'express'
import { signInWithEmail } from '@controllers/auth-controllers'

const router = Express.Router()

router.post('/sign-in/email', signInWithEmail)

export default router