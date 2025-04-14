import { Request, Response } from 'express'
import { todoService } from '../services/todo.service'
import { CreateTodoDto, UpdateTodoDto } from '../interfaces/todo.interface'

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - completed
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный идентификатор задачи
 *         title:
 *           type: string
 *           description: Название задачи
 *         completed:
 *           type: boolean
 *           description: Статус выполнения
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Дата последнего обновления
 *     CreateTodoDto:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Название задачи
 *     UpdateTodoDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Название задачи
 *         completed:
 *           type: boolean
 *           description: Статус выполнения
 */

/**
 * @swagger
 * /api/todo:
 *   get:
 *     summary: Получить все задачи
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Список всех задач
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
export const getAllTodos = async (req: Request, res: Response) => {
	const todos = await todoService.getAllTodos()
	res.json(todos)
}

/**
 * @swagger
 * /api/todo/{id}:
 *   get:
 *     summary: Получить задачу по ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Задача не найдена
 */
export const getTodoById = async (req: Request, res: Response) => {
	const todo = await todoService.getTodoById(req.params.id)
	if (!todo) {
		return res.status(404).json({ error: 'Todo not found' })
	}
	res.json(todo)
}

/**
 * @swagger
 * /api/todo:
 *   post:
 *     summary: Создать новую задачу
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoDto'
 *     responses:
 *       201:
 *         description: Задача создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Неверные данные
 */
export const createTodo = async (req: Request, res: Response) => {
	const dto: CreateTodoDto = req.body
	if (!dto.title) {
		return res.status(400).json({ error: 'Title is required' })
	}
	const todo = await todoService.createTodo(dto)
	res.status(201).json(todo)
}

/**
 * @swagger
 * /api/todo/{id}:
 *   put:
 *     summary: Обновить задачу
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID задачи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoDto'
 *     responses:
 *       200:
 *         description: Задача обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Задача не найдена
 */
export const updateTodo = async (req: Request, res: Response) => {
	const dto: UpdateTodoDto = req.body
	const todo = await todoService.updateTodo(req.params.id, dto)
	if (!todo) {
		return res.status(404).json({ error: 'Todo not found' })
	}
	res.json(todo)
}

/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     summary: Удалить задачу
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID задачи
 *     responses:
 *       204:
 *         description: Задача удалена
 *       404:
 *         description: Задача не найдена
 */
export const deleteTodo = async (req: Request, res: Response) => {
	const success = await todoService.deleteTodo(req.params.id)
	if (!success) {
		return res.status(404).json({ error: 'Todo not found' })
	}
	res.status(204).send()
}
