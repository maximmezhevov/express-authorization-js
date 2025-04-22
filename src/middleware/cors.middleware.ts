import cors from 'cors'
import { Express } from 'express'

export const setupCors = (app: Express): void => {
	// Handle OPTIONS method
	app.options('*', (req, res) => {
		console.log('Handling OPTIONS request')
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET,OPTIONS,PATCH,DELETE,POST,PUT'
		)
		res.setHeader(
			'Access-Control-Allow-Headers',
			'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
		)
		res.setHeader('Access-Control-Allow-Credentials', 'true')
		res.status(200).end()
	})

	// CORS
	app.use(
		cors({
			origin: '*',
			credentials: true,
			methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
			allowedHeaders: [
				'X-CSRF-Token',
				'X-Requested-With',
				'Accept',
				'Accept-Version',
				'Content-Length',
				'Content-MD5',
				'Content-Type',
				'Date',
				'X-Api-Version',
				'Authorization'
			]
		})
	)
}
