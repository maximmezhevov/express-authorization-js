import { Todo } from '@prisma/client'

export type { Todo }

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID задачи
 *         title:
 *           type: string
 *           description: Название задачи
 *         completed:
 *           type: boolean
 *           description: Статус выполнения задачи
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Дата обновления
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
 *           description: Статус выполнения задачи
 */

export interface CreateTodoDto {
	title: string
}

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