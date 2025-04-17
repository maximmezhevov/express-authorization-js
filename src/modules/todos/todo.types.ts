import { Todo } from '@prisma/client'

export type { Todo }

/**
 * @swagger
 * components:
 *   schemas:
 *     $ref: '../../config/swagger.schemas.ts#/Todo'
 *     CreateTodoDto:
 *       $ref: '../../config/swagger.schemas.ts#/CreateTodoDto'
 *     UpdateTodoDto:
 *       $ref: '../../config/swagger.schemas.ts#/UpdateTodoDto'
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