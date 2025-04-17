import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Todo API',
			version: '1.0.0',
			description: 'API для управления задачами'
		},
		servers: [
			{
				url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:8001',
				description: process.env.VERCEL_URL ? 'Production server' : 'Development server'
			}
		]
	},
	apis: ['./src/modules/**/*.ts']
}

export const configureSwagger = (app: Express) => {
	const specs = swaggerJsdoc(options)

	// Serve Swagger UI on /api-docs
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
		explorer: true,
		customSiteTitle: 'Todo API Documentation'
	}))

	// Serve Swagger JSON on /api-docs.json
	app.get('/api-docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json')
		res.send(specs)
	})
}
