import 'module-alias/register';
import express, { Express } from 'express'
import cors, { CorsOptions } from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import dotenv from 'dotenv'


// routes
import authRoutes from '@routes/auth-routes'
import projectRoutes from '@routes/project-routes'


dotenv.config()
const { NODE_PORT, NODE_PUBLIC_DEV_BASE_URL } = process.env

const corsOptions: CorsOptions = {
    origin: [NODE_PUBLIC_DEV_BASE_URL as string],
    methods: ["POST", "PUT", "DELETE", 'GET'],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

const app: Express = express()

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('common'));
app.use(express.json());
app.use(cookieParser());
// app.use(limiter);

app.use('/api/auth', authRoutes)
app.use('/api/project', projectRoutes)



app.get('/', (req, res) => {
    res.send('hello')
})

const port = NODE_PORT || 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})