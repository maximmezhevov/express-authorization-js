export const swaggerSchemas = {
	Todo: {
		type: 'object',
		required: ['id', 'title', 'completed', 'createdAt', 'updatedAt'],
		properties: {
			id: {
				type: 'string',
				description: 'Уникальный идентификатор задачи'
			},
			title: {
				type: 'string',
				description: 'Название задачи'
			},
			completed: {
				type: 'boolean',
				description: 'Статус выполнения'
			},
			createdAt: {
				type: 'string',
				format: 'date-time',
				description: 'Дата создания'
			},
			updatedAt: {
				type: 'string',
				format: 'date-time',
				description: 'Дата последнего обновления'
			}
		}
	},
	CreateTodoDto: {
		type: 'object',
		required: ['title'],
		properties: {
			title: {
				type: 'string',
				description: 'Название задачи'
			}
		}
	},
	UpdateTodoDto: {
		type: 'object',
		properties: {
			title: {
				type: 'string',
				description: 'Название задачи'
			},
			completed: {
				type: 'boolean',
				description: 'Статус выполнения'
			}
		}
	}
} 