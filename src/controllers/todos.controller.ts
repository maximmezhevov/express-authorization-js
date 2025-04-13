import { Request, Response } from 'express'
import { TODOS, type Todo } from '../models/todos.model'

export const getAllTodos = (req: Request, res: Response<Todo[]>) => {
	res.status(200).json(TODOS)
}

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
