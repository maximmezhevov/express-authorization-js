import dotenv from 'dotenv'
import { createApp } from './app'

dotenv.config()

const app = createApp()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`)
})

export default app
