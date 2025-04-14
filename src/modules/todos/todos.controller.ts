import { Router } from 'express'
import { TodoService } from './todos.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'

const router = Router()
const todoService = new TodoService()

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Получить список всех задач
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Список задач успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', async (req, res) => {
	const todos = await todoService.findAll()
	res.json(todos)
})

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
 *         description: Задача успешно найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Задача не найдена
 */
router.get('/:id', async (req, res) => {
	const todo = await todoService.findOne(req.params.id)
	if (!todo) {
		return res.status(404).json({ message: 'Todo not found' })
	}
	res.json(todo)
})

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
 *         description: Задача успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post('/', async (req, res) => {
	const todoData: CreateTodoDto = req.body
	const newTodo = await todoService.create(todoData)
	res.status(201).json(newTodo)
})

/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
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
 *         description: Задача успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Задача не найдена
 */
router.patch('/:id', async (req, res) => {
	const todoData: UpdateTodoDto = req.body
	const updatedTodo = await todoService.update(req.params.id, todoData)
	if (!updatedTodo) {
		return res.status(404).json({ message: 'Todo not found' })
	}
	res.json(updatedTodo)
})

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
 *       200:
 *         description: Задача успешно удалена
 *       404:
 *         description: Задача не найдена
 */
router.delete('/:id', async (req, res) => {
	const success = await todoService.delete(req.params.id)
	if (!success) {
		return res.status(404).json({ message: 'Todo not found' })
	}
	res.status(200).json({ message: 'Todo deleted successfully' })
})

export const todosController = router 