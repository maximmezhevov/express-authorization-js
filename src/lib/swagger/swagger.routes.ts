// src/routes/swagger.routes.ts
import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerJsdocOptions, swaggerUiOptions } from './swagger.config'

const router = Router()

// Serve Swagger UI
router.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerJsdocOptions, {
		...swaggerUiOptions,
		customSiteTitle: 'Todo API Documentation',
		customfavIcon: '/favicon.ico'
	})
)

// Serve Swagger JSON
router.get('/api-docs.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send(swaggerJsdocOptions)
})

export const swaggerRoutes = router
