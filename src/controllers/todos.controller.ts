import { Request, Response } from 'express'

interface Todo {
	id: string
	todo: string
}

const TODOS: Todo[] = [
	{ id: '1', todo: 'text1' },
	{ id: '2', todo: 'text2' },
	{ id: '3', todo: 'text3' }
]

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         todo:
 *           type: string
 *           example: "text1"
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
export const getAllTodos = (req: Request, res: Response<Todo[]>) => {
	res.status(200).json(TODOS)
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
 *       400:
 *         description: Неверный запрос (например, отсутствует ID)
 *       404:
 *         description: Задача не найдена
 *       500:
 *         description: Ошибка сервера
 */
export const getTodoById = (
	req: Request<{ id: string }>,
	res: Response<Todo | { error: string }>
) => {
	try {
		const { id } = req.params
		if (!id) throw new Error('ID is required')

		const todo = TODOS.find(todo => todo.id === id)
		if (!todo) throw new Error('Not found')

		res.status(200).json(todo)
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message })
		} else {
			res.status(500).json({ error: 'Unknown error occurred' })
		}
	}
}
