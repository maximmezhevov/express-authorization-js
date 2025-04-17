import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { swagger } from './swagger/swagger'
import { prisma } from './lib/prisma'
import { TodoService, TodoController, createTodoRouter } from './modules/todos'

dotenv.config()

const app = express()

// Middleware
app.use((req, res, next) => {
	console.log('Request URL:', req.url);
	console.log('Request Method:', req.method);
	console.log('Request Origin:', req.headers.origin);
	console.log('Request Headers:', req.headers);
	next();
});

// Handle OPTIONS method
app.options('*', (req, res) => {
	console.log('Handling OPTIONS request');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
	res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.status(200).end();
});

app.use(cors({
	origin: '*',
	credentials: true,
	methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
	allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'Authorization']
}));

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
swagger(app)

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
		console.log(`Local server running on port ${PORT} in development mode`)
	})
}

export default app
