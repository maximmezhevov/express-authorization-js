import { Request, Response } from 'express'
import { TodoService } from './todo.service'
import { CreateTodoDto, UpdateTodoDto } from './todo.types'

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API для управления задачами
 */
export class TodoController {
	constructor(private todoService: TodoService) {}

	/**
	 * @swagger
	 * /api/todos:
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
	async getAllTodos(req: Request, res: Response) {
		const todos = await this.todoService.getAllTodos()
		res.json(todos)
	}

	/**
	 * @swagger
	 * /api/todos/{id}:
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
	async getTodoById(req: Request, res: Response) {
		const todo = await this.todoService.getTodoById(req.params.id)
		if (!todo) {
			return res.status(404).json({ error: 'Todo not found' })
		}
		res.json(todo)
	}

	/**
	 * @swagger
	 * /api/todos:
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
	async createTodo(req: Request, res: Response) {
		const dto: CreateTodoDto = req.body
		if (!dto.title?.trim()) {
			return res.status(400).json({ error: 'Title is required' })
		}
		const todo = await this.todoService.createTodo(dto)
		res.status(201).json(todo)
	}

	/**
	 * @swagger
	 * /api/todos/{id}:
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
	async updateTodo(req: Request, res: Response) {
		try {
			const todo = await this.todoService.updateTodo(req.params.id, req.body)
			res.json(todo)
		} catch (error) {
			res.status(404).json({ error: 'Todo not found' })
		}
	}

	/**
	 * @swagger
	 * /api/todos/{id}:
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
	async deleteTodo(req: Request, res: Response) {
		try {
			await this.todoService.deleteTodo(req.params.id)
			res.status(204).send()
		} catch (error) {
			res.status(404).json({ error: 'Todo not found' })
		}
	}
} 