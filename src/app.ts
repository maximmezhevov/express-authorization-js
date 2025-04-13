import express, { type Express } from 'express'
import { configureServer } from './config/server.config'
import pageRoutes from './routes/pages.routes'
import todosRoutes from './routes/todos.router'

export const createApp = (): Express => {
	const app: Express = express()

	configureServer(app)

	app.use('/', pageRoutes)
	app.use('/api', todosRoutes)

	return app
}
