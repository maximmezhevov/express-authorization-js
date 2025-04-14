import { PrismaClient } from '@prisma/client'
import { CreateTodoDto, UpdateTodoDto } from './todo.types'

export class TodoService {
	constructor(private prisma: PrismaClient) {}

	async getAllTodos() {
		return this.prisma.todo.findMany({
			orderBy: { createdAt: 'desc' }
		})
	}

	async getTodoById(id: string) {
		return this.prisma.todo.findUnique({
			where: { id }
		})
	}

	async createTodo(dto: CreateTodoDto) {
		return this.prisma.todo.create({
			data: {
				title: dto.title
			}
		})
	}

	async updateTodo(id: string, dto: UpdateTodoDto) {
		return this.prisma.todo.update({
			where: { id },
			data: dto
		})
	}

	async deleteTodo(id: string) {
		await this.prisma.todo.delete({
			where: { id }
		})
		return true
	}
} 