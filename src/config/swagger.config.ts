import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import { swaggerSchemas } from './swagger.schemas'

const getServerUrl = () => {
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}
	return `http://localhost:${process.env.PORT || 8001}`
}

export const configureSwagger = (app: Express) => {
	const options = {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Todo API',
				version: '1.0.0',
				description: 'API для управления задачами',
				license: {
					name: 'MIT',
					url: 'https://opensource.org/licenses/MIT'
				}
			},
			servers: [
				{
					url: getServerUrl(),
					description: process.env.VERCEL_URL ? 'Production server' : 'Development server'
				}
			],
			components: {
				schemas: swaggerSchemas
			}
		},
		apis: [
			path.join(__dirname, '../modules/**/*.ts'),
			path.join(__dirname, '../modules/**/*.js')
		]
	}

	const specs = swaggerJsdoc(options)

	// Serve Swagger UI
	app.use('/', swaggerUi.serve)
	app.get('/', swaggerUi.setup(specs, {
		customSiteTitle: 'Todo API Documentation',
		swaggerOptions: {
			docExpansion: 'list',
			filter: true,
			showExtensions: true,
			showCommonExtensions: true,
			deepLinking: true,
			persistAuthorization: true,
			displayRequestDuration: true,
			tryItOutEnabled: true
		},
		customCss: '.swagger-ui .topbar { display: none }',
		customJs: '',
		customfavIcon: '/favicon.ico'
	}))
}
