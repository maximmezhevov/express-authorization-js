import { Router } from 'express'
import path from 'path'

const router = Router()

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'))
})

router.get('/extra-page', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/extra-page.html'))
})

<<<<<<< HEAD
const pagesRoutes: Router = router
export default pagesRoutes
=======
export const pageRoutes = router
>>>>>>> 3bced7f89fde9f0eb0fbe85a6500bab3c9e2f4e1
