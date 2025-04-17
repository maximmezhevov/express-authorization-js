import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import express, { Express } from 'express'
import path from 'path'

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
		],
		components: {
			schemas: {
				Todo: {
					type: 'object',
					properties: {
						id: {
							type: 'string',
							description: 'ID задачи'
						},
						title: {
							type: 'string',
							description: 'Название задачи'
						},
						completed: {
							type: 'boolean',
							description: 'Статус выполнения задачи'
						},
						createdAt: {
							type: 'string',
							format: 'date-time',
							description: 'Дата создания'
						},
						updatedAt: {
							type: 'string',
							format: 'date-time',
							description: 'Дата обновления'
						}
					}
				},
				CreateTodoDto: {
					type: 'object',
					required: ['title'],
					properties: {
						title: {
							type: 'string',
							description: 'Название задачи'
						}
					}
				},
				UpdateTodoDto: {
					type: 'object',
					properties: {
						title: {
							type: 'string',
							description: 'Название задачи'
						},
						completed: {
							type: 'boolean',
							description: 'Статус выполнения задачи'
						}
					}
				}
			}
		}
	},
	apis: [
		path.join(__dirname, '../modules/**/*.ts'),
		path.join(__dirname, '../modules/**/*.js')
	]
}

export const configureSwagger = (app: Express) => {
	const specs = swaggerJsdoc(options)

	// Serve Swagger UI static files
	app.use('/swagger-ui', express.static(path.join(__dirname, '../../node_modules/swagger-ui-dist')))

	// Serve Swagger UI
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
		explorer: true,
		customSiteTitle: 'Todo API Documentation',
		swaggerOptions: {
			persistAuthorization: true,
			displayRequestDuration: true,
			urls: [
				{
					url: '/api-docs.json',
					name: 'json api documentation'
				}
			]
		},
		customCss: '.swagger-ui .topbar { display: none }',
		customJs: '',
		customfavIcon: '/favicon.ico'
	}))

	// Serve Swagger JSON
	app.get('/api-docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json')
		res.send(specs)
	})
}
