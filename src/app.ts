import express, { Express } from 'express'
import { configureServer } from './config/server.config'
import { apiRoutes } from './routes/api.routes'
import { pageRoutes } from './routes/pages.routes'

export const createApp = (): Express => {
	const app: Express = express()

	configureServer(app)

	app.use('/api', apiRoutes)
	app.use('/', pageRoutes)

	return app
}
