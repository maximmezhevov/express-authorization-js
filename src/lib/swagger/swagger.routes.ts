// src/routes/swagger.routes.ts
import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import { swaggerJsdocOptions, swaggerUiOptions } from './swagger.config'
import express from 'express'

const router = Router()

// Serve Swagger UI static files
router.use(
	'/swagger-ui',
	express.static(path.join(__dirname, '../../node_modules/swagger-ui-dist'))
)

// Serve Swagger UI
router.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerJsdocOptions, swaggerUiOptions)
)

// Serve Swagger JSON
router.get('/api-docs.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.send(swaggerJsdocOptions)
})

export const swaggerRoutes = router
