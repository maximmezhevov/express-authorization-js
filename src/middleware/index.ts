import { Express } from 'express'

import { setupCors } from './cors.middleware'

export const middleware = (app: Express): void => {
	setupCors(app)
}
