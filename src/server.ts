import dotenv from 'dotenv'
import { createApp } from './app'

dotenv.config()

const app = createApp()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	if (process.env.NODE_ENV === 'development') {
		console.log(`🚀 Server running on http://localhost:${PORT}`)
	}
})

export default app
