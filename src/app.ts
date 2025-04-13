import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()

const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
	res.json({ message: 'Hello, TypeScript Express!' })
})

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
