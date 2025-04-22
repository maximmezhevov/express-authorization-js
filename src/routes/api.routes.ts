import { Express } from 'express'

import { prisma } from '../lib/prisma'
import { createTodoRouter } from '../modules/todos'

export const apiRoutes = (app: Express): void => {
	app.use('/api', createTodoRouter(prisma)) // Setup Todo routes
}
