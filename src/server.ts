import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
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

// Server
const PORT = process.env.PORT || 8001

if (process.env.NODE_ENV === 'production') {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
		console.log(`Swagger UI available at: ${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${PORT}`}`)
	})
} else {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT} in development mode`)
		console.log(`Swagger UI available at: http://localhost:${PORT}`)
	})
}

export default app
