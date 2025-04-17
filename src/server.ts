import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { configureSwagger } from './config/swagger.config'
import { prisma } from './lib/prisma'
import { TodoService, TodoController, createTodoRouter } from './modules/todos'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Логирование запросов
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`)
	next()
})

// Root endpoint
app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to Todo API',
		documention: '/api-docs',
		health: '/health'
	})
})

// Health check endpoint
app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok' })
})

// Configure Swagger
configureSwagger(app)

// Initialize services and controllers
const todoService = new TodoService(prisma)
const todoController = new TodoController(todoService)

// Setup routes
app.use('/api', createTodoRouter(todoController))

// Обработка 404
app.use((req, res) => {
	console.log(`404: ${req.method} ${req.url}`)
	res.status(404).json({
		status: 'error',
		message: 'Not found'
	})
})

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error(`Error: ${err.message}`)
	console.error(err.stack)
	res.status(500).json({
		status: 'error',
		message: 'Internal server error'
	})
})

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
	const PORT = process.env.PORT || 8001
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT} in development mode`)
		console.log(`Swagger UI available at: http://localhost:${PORT}/api-docs`)
	})
}

export default app
