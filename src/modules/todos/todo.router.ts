import { Router } from 'express'
import { TodoController } from './todo.controller'

export function createTodoRouter(controller: TodoController): Router {
	const router = Router()

	router.get('/todos', controller.getAllTodos.bind(controller))
	router.get('/todos/:id', controller.getTodoById.bind(controller))
	router.post('/todos', controller.createTodo.bind(controller))
	router.put('/todos/:id', controller.updateTodo.bind(controller))
	router.delete('/todos/:id', controller.deleteTodo.bind(controller))

	return router
} 