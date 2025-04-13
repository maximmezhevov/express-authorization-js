import { Router } from 'express'
import path from 'path'

const router = Router()

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'))
})

router.get('/extra-page', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/extra-page.html'))
})

export const pageRoutes = router
