import { Router } from 'express'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'
import { PrismaClient } from '@prisma/client'

export function createTodoRouter(prisma: PrismaClient): Router {
	const router = Router()

	// Инициализация сервиса и контроллера
	const todoService = new TodoService(prisma)
	const todoController = new TodoController(todoService)

	// Настройка маршрутов
	router.get('/todos', todoController.getAllTodos.bind(todoController))
	router.get('/todos/:id', todoController.getTodoById.bind(todoController))
	router.post('/todos', todoController.createTodo.bind(todoController))
	router.put('/todos/:id', todoController.updateTodo.bind(todoController))
	router.delete('/todos/:id', todoController.deleteTodo.bind(todoController))

	return router
} 