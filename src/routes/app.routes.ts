import { Express } from 'express'

import { swagger } from '../lib/swagger/swagger'

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
	swagger(app)
}
