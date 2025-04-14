import express, { type Express } from 'express'
import { configureServer } from './config/server.config'
import { configureSwagger } from './config/swagger.config'
import todosRoutes from './routes/todos.route'

export const createApp = (): Express => {
	const app: Express = express()
	configureServer(app)
	configureSwagger(app)

	app.use('/api', todosRoutes)

	return app
}
