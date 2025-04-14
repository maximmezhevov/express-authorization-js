import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const PORT = process.env.PORT || 8001

export const configureSwagger = (app: Express) => {
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
					url: 'https://express-authorization-js.vercel.app',
					description: 'Production server'
				},
				{
					url: `http://localhost:${PORT}`,
					description: 'Local server'
				}
			]
		},
		apis: [
			path.join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'src', 'routes', '*.{ts,js}'),
			path.join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'src', 'controllers', '*.{ts,js}')
		]
	}

	const specs = swaggerJsdoc(options)

	const swaggerHtml = swaggerUi.generateHTML(specs, {
		customSiteTitle: 'Todo API Docs',
		swaggerOptions: {
			displayRequestDuration: true,
			defaultModelsExpandDepth: -1
		}
	})

	app.use('/api-docs', swaggerUi.serveFiles(specs))
	app.get('/api-docs', (req, res) => { res.send(swaggerHtml) })
}
