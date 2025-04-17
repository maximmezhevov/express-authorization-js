import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import express, { Express } from 'express'
import path from 'path'
import { swaggerSchemas } from './swagger.schemas'

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Todo API',
			version: '1.0.0',
			description: 'API для управления задачами'
		},
		servers: process.env.VERCEL_URL ?
			[
				{
					url: 'https://express-authorization-js.vercel.app',
					description: 'Vercel Production server (Assigned Domain)'
				},
				{
					url: 'https://express-authorization-js-git-master-mzhvv.vercel.app',
					description: 'Git master branch (Latest deployment on branch—updates automatically)'
				}
			] : [
				{
					url: `http://localhost:${process.env.PORT || 8001}`,
					description: 'Local Development server'
				},
				{
					url: 'https://express-authorization-js.vercel.app',
					description: 'Vercel Production server (Assigned Domain)'
				},
				{
					url: 'https://express-authorization-js-git-master-mzhvv.vercel.app',
					description: 'Git master branch (Latest deployment on branch—updates automatically)'
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
