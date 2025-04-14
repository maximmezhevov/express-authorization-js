import express from 'express'
import dotenv from 'dotenv'
import { configureSwagger } from './config/swagger.config'
import { prisma } from './lib/prisma'
import { TodoService, TodoController, createTodoRouter } from './modules/todos'

dotenv.config()

const app = express()
app.use(express.json())

// Configure Swagger
configureSwagger(app)

// Initialize services and controllers
const todoService = new TodoService(prisma)
const todoController = new TodoController(todoService)

// Setup routes
app.use('/api', createTodoRouter(todoController))

const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})

export default app
