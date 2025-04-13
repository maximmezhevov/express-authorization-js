import { Request, Response, Router } from 'express'

const router = Router()

router.get('/api/return/:text', (req: Request, res: Response) => {
	const { text } = req.params
	res.json(text)
})

export const apiRoutes = router
