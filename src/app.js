import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'


import authRoutes from './routes/auth.routes.js'
import museumRoutes from './routes/museum.routes.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())


app.use('/api', authRoutes)
app.use('/api', museumRoutes)

export default app;
