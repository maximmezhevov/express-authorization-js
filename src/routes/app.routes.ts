import { Express } from 'express'

import { swaggerRoutes } from '../lib/swagger'

export const appRoutes = (app: Express): void => {
	// Root endpoint
	app.get('/', (req, res) => {
		res.json({
			message: 'Welcome to Todo API',
			documentation: '/api-docs',
			documentationJSON: '/api-docs.json'
		})
	})

	// Configure Swagger
	app.use(swaggerRoutes)
}
