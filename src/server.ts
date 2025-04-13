import dotenv from 'dotenv'
import { createApp } from './app'

dotenv.config()

const app = createApp()
const port = process.env.PORT || 3001

app.listen(port, () => {
	console.log(`Local server running on http://localhost:${port}`)
})

export default app
