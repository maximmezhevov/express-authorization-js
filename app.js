const express = require('express')
const app = express()

require('dotenv').config()
app.use(express.json())

app.get('/', (req, res) => {
	res.json({ message: 'Hello, Express!' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
