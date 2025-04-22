import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

import { middleware } from './middleware'
import { routes } from './routes'

dotenv.config()

const app = express()

// Basic middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../public')))

// Setup middleware
middleware(app)

// Setup routes
routes(app)

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
	const PORT = process.env.PORT || 8001

	app.listen(PORT, () => {
		console.log(`Local server running on port ${PORT} in development mode`)
	})
}

export default app
