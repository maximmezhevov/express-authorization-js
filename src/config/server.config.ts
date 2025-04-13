import express, { Express } from 'express'
import path from 'path'

export const configureServer = (app: Express) => {
	app.use(express.json())

	app.use(express.static(path.join(__dirname, '../../public')))
}
