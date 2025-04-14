import express, { type Express } from 'express'
import { configureServer } from './config/server.config'
import { configureSwagger } from './config/swagger.config'
import todosRoutes from './routes/todos.route'

export const createApp = (): Express => {
	console.log('Creating Express app...')
	const app: Express = express()
	
	console.log('Configuring server...')
	configureServer(app)
	
	console.log('Configuring Swagger...')
	configureSwagger(app)

	console.log('Setting up routes...')
	app.use('/api', todosRoutes)

	app.get('/', (req, res) => {
		res.json({ status: 'Server is running' })
	})

	console.log('App setup completed')
	return app
}
