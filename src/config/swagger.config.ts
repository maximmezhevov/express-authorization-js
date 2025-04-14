import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import express from 'express'

const PORT = process.env.PORT || 8001

export const configureSwagger = (app: Express) => {
	const options = {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Todo API',
				version: '1.0.0',
				description: 'API для управления задачами',
				contact: {
					name: 'API Support',
					email: 'support@example.com'
				},
				license: {
					name: 'MIT',
					url: 'https://opensource.org/licenses/MIT'
				}
			},
			servers: [
				{
					url: 'https://express-authorization-js.vercel.app',
					description: 'Production server'
				},
				{
					url: `http://localhost:${PORT}`,
					description: 'Local server'
				}
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT'
					}
				}
			}
		},
		apis: ['./src/routes/*.ts', './src/controllers/*.ts']
	}

	const specs = swaggerJsdoc(options)

	// Serve swagger-ui static files from node_modules
	app.use('/api-docs/swagger-ui', express.static(
		path.join(__dirname, '../../node_modules/swagger-ui-dist/')
	))

	// Custom HTML to use local static files
	const customHtml = swaggerUi.generateHTML(specs, {
		customSiteTitle: 'Todo API Docs',
		customCssUrl: '/api-docs/swagger-ui/swagger-ui.css',
		customJs: '/api-docs/swagger-ui/swagger-ui-bundle.js',
		customfavIcon: '/api-docs/swagger-ui/favicon-32x32.png'
	})

	app.get('/api-docs', (req, res) => {
		res.send(customHtml)
	})

	// Setup API routes
	app.use('/api-docs', swaggerUi.serveFiles(specs))
}
