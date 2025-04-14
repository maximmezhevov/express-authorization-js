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
					url: process.env.VERCEL_URL
						? `https://${process.env.VERCEL_URL}`
						: `http://localhost:${PORT}`
				}
			]
		},
		apis:
			process.env.NODE_ENV === 'production' || !process.env.NODE_ENV
				? ['./dist/routes/*.js', './dist/controllers/*.js']
				: [
						path.join(__dirname, '../routes/*.ts'),
						path.join(__dirname, '../controllers/*.ts')
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
