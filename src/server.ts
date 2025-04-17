import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { configureSwagger } from './config/swagger.config'
import { prisma } from './lib/prisma'
import { TodoService, TodoController, createTodoRouter } from './modules/todos'

dotenv.config()

const app = express()

// Middleware
const allowedOrigins = process.env.NODE_ENV === 'production'
	? [
		process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
		...(process.env.ALLOWED_ORIGINS?.split(',') || [])
	].filter(Boolean)
	: ['http://localhost:3000', 'http://localhost:8001']

app.use(cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
}))
app.use(express.json())

// Configure Swagger
configureSwagger(app)

// Initialize services and controllers
const todoService = new TodoService(prisma)
const todoController = new TodoController(todoService)

// Setup routes
app.use('/api', createTodoRouter(todoController))

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error(err.stack)
	res.status(500).json({
		status: 'error',
		message: process.env.NODE_ENV === 'production'
			? 'Internal server error'
			: err.message
	})
})

// Server

const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})

export default app
