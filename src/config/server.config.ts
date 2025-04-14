import express, { type Express } from 'express'
import path from 'path'

export const configureServer = (app: Express) => {
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*')
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
		res.header('Access-Control-Allow-Headers', 'Content-Type')
		next()
	})

	app.use(express.json())

	app.use(express.static(path.join(__dirname, '../../public')))
}
