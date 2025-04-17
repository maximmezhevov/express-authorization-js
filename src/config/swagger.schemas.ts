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
export const swaggerSchemas = {
  Todo: {
    type: 'object',
    required: ['title'],
    properties: {
      id: {
        type: 'string',
        description: 'The todo ID'
      },
      title: {
        type: 'string',
        description: 'The todo title'
      },
      completed: {
        type: 'boolean',
        description: 'The todo status',
        default: false
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'The creation timestamp'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'The last update timestamp'
      }
    }
  },

  CreateTodoDto: {
    type: 'object',
    required: ['title'],
    properties: {
      title: {
        type: 'string',
        description: 'The todo title'
      },
      completed: {
        type: 'boolean',
        description: 'The todo status',
        default: false
      }
    }
  },
  UpdateTodoDto: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'The todo title'
      },
      completed: {
        type: 'boolean',
        description: 'The todo status'
      }
    }
  },

  Error: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'Error status'
      },
      message: {
        type: 'string',
        description: 'Error message'
      }
    }
  }
} 