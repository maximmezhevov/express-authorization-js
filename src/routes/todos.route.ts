import { Router } from 'express'
import { getAllTodos, getTodoById } from '../controllers/todos.controller'

const todosRoutes = Router()

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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID задачи
 *                   title:
 *                     type: string
 *                     description: Название задачи
 *                   completed:
 *                     type: boolean
 *                     description: Статус выполнения
 */
todosRoutes.get('/todo', getAllTodos)

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
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID задачи
 *                 title:
 *                   type: string
 *                   description: Название задачи
 *                 completed:
 *                   type: boolean
 *                   description: Статус выполнения
 *       404:
 *         description: Задача не найдена
 */
todosRoutes.get('/todo/:id', getTodoById)

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API для управления задачами
 */

export default todosRoutes
