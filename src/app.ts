<<<<<<< HEAD
import express, { type Express } from 'express'
import { configureServer } from './config/server.config'
import pageRoutes from './routes/pages.routes'
import todosRoutes from './routes/todos.router'
=======
import express, { Express } from 'express'
import { configureServer } from './config/server.config'
import { apiRoutes } from './routes/api.routes'
import { pageRoutes } from './routes/pages.routes'
>>>>>>> 3bced7f89fde9f0eb0fbe85a6500bab3c9e2f4e1

export const createApp = (): Express => {
	const app: Express = express()

	configureServer(app)

<<<<<<< HEAD
	app.use('/', pageRoutes)
	app.use('/api', todosRoutes)
=======
	app.use('/api', apiRoutes)
	app.use('/', pageRoutes)
>>>>>>> 3bced7f89fde9f0eb0fbe85a6500bab3c9e2f4e1

	return app
}
