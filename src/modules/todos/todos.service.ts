import { PrismaClient } from '@prisma/client'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'

const prisma = new PrismaClient()

export class TodoService {
  async findAll() {
    return prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }

  async findOne(id: string) {
    return prisma.todo.findUnique({
      where: { id }
    })
  }

  async create(data: CreateTodoDto) {
    return prisma.todo.create({
      data: {
        ...data,
        completed: false
      }
    })
  }

  async update(id: string, data: UpdateTodoDto) {
    return prisma.todo.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    try {
      await prisma.todo.delete({
        where: { id }
      })
      return true
    } catch {
      return false
    }
  }
} 