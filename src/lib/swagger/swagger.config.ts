// src/config/swagger.config.ts
import path from 'path'
import { swaggerSchemas } from './swagger.schemas'
import swaggerJsdoc from 'swagger-jsdoc'
import { SwaggerUiOptions } from 'swagger-ui-express'

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Todo API',
			version: '1.0.0',
			description: 'API для управления задачами'
		},
		servers: process.env.VERCEL_URL
			? [
					{
						url: 'https://express-authorization-js.vercel.app',
						description: 'Vercel Production server (Assigned Domain)'
					},
					{
						url: 'https://express-authorization-js-git-master-mzhvv.vercel.app',
						description:
							'Git master branch (Latest deployment on branch—updates automatically)'
					}
			  ]
			: [
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
						description:
							'Git master branch (Latest deployment on branch—updates automatically)'
					}
			  ],
		components: {
			schemas: swaggerSchemas
		}
	},
	apis: [
		path.join(__dirname, '../../modules/**/*.ts'),
		path.join(__dirname, '../../modules/**/*.js')
	]
}

export const swaggerJsdocOptions = swaggerJsdoc(swaggerOptions)

export const swaggerUiOptions: SwaggerUiOptions = {
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
}
