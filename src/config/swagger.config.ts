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
					url: process.env.NODE_ENV === 'production'
						? 'https://express-authorization-js.vercel.app'
						: `http://localhost:${PORT}`,
					description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
				}
			]
		},
		apis: [
			path.join(__dirname, '../modules/**/*.ts'),
			path.join(__dirname, '../modules/**/*.js')
		]
	}

	const specs = swaggerJsdoc(options)

	// Serve swagger-ui static files from node_modules
	app.use('/swagger-ui', express.static(
		path.join(__dirname, '../../node_modules/swagger-ui-dist/')
	))

	// Custom HTML to use local static files
	const customHtml = swaggerUi.generateHTML(specs, {
		customSiteTitle: 'Todo API Docs',
		customCssUrl: '/swagger-ui/swagger-ui.css',
		customJs: '/swagger-ui/swagger-ui-bundle.js',
		customfavIcon: '/swagger-ui/favicon-32x32.png'
	})

	// Serve Swagger UI at root
	app.get('/', (req, res) => {
		res.send(customHtml)
	})

	// Setup API routes
	app.use('/', swaggerUi.serveFiles(specs))
}
