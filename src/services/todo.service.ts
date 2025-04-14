import {
	Todo,
	CreateTodoDto,
	UpdateTodoDto
} from '../interfaces/todo.interface'

class TodoService {
	private todos: Todo[] = []

	async getAllTodos(): Promise<Todo[]> {
		return this.todos
	}

	async getTodoById(id: string): Promise<Todo | null> {
		return this.todos.find(todo => todo.id === id) || null
	}

	async createTodo(dto: CreateTodoDto): Promise<Todo> {
		const todo: Todo = {
			id: Date.now().toString(),
			title: dto.title,
			completed: false,
			createdAt: new Date(),
			updatedAt: new Date()
		}
		this.todos.push(todo)
		return todo
	}

	async updateTodo(id: string, dto: UpdateTodoDto): Promise<Todo | null> {
		const index = this.todos.findIndex(todo => todo.id === id)
		if (index === -1) return null

		const updatedTodo = {
			...this.todos[index],
			...dto,
			updatedAt: new Date()
		}
		this.todos[index] = updatedTodo
		return updatedTodo
	}

	async deleteTodo(id: string): Promise<boolean> {
		const index = this.todos.findIndex(todo => todo.id === id)
		if (index === -1) return false

		this.todos.splice(index, 1)
		return true
	}
}

export const todoService = new TodoService()
