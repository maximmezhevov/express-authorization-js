import { Router } from 'express'
import { getAllTodos, getTodoById } from '../controllers/todos.controller'

const todosRoutes = Router()

todosRoutes.get('/todo', getAllTodos)
todosRoutes.get('/todo/:id', getTodoById)

export default todosRoutes
