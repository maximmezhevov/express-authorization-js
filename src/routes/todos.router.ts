import { Router } from 'express'
import { getAllTodos, getTodoById } from '../controllers/todos.controller'

const router = Router()

router.get('/todo', getAllTodos)
router.get('/todo/:id', getTodoById)

const todosRoutes: Router = router
export default todosRoutes
