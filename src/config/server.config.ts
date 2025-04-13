<<<<<<< HEAD
import express, { type Express } from 'express'
=======
import express, { Express } from 'express'
>>>>>>> 3bced7f89fde9f0eb0fbe85a6500bab3c9e2f4e1
import path from 'path'

export const configureServer = (app: Express) => {
	app.use(express.json())

	app.use(express.static(path.join(__dirname, '../../public')))
}
