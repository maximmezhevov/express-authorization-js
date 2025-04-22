import { Express } from 'express'

import { appRoutes } from './app.routes'
import { apiRoutes } from './api.routes'

export const routes = (app: Express): void => {
	appRoutes(app)
	apiRoutes(app)
}
