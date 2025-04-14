import { Todo } from '@prisma/client'

export type { Todo }

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
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTodoDto:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Название задачи
 */
export interface CreateTodoDto {
	title: string
}

/**
 * @swagger
 * components:
 *   schemas:
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
export interface UpdateTodoDto {
	title?: string
	completed?: boolean
}

export interface TodosController {
	getAllTodos(): Promise<Todo[]>
	getTodoById(id: string): Promise<Todo | null>
	createTodo(dto: CreateTodoDto): Promise<Todo>
	updateTodo(id: string, dto: UpdateTodoDto): Promise<Todo>
	deleteTodo(id: string): Promise<boolean>
} 