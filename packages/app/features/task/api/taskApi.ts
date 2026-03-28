import { apiClient } from '../../auth/api/apiClient'
import { TaskSchema, TaskListResponseSchema } from '../domain/schema'
import type { TaskApiPort } from '../domain/ports'
import type { Task, CreateTask, UpdateTask } from '../domain/types'

export const taskApi: TaskApiPort = {
  async getTasks(): Promise<Task[]> {
    const response = await apiClient.get('/tasks')
    return TaskListResponseSchema.parse(response.data)
  },

  async getTask(id: string): Promise<Task> {
    const response = await apiClient.get(`/tasks/${id}`)
    return TaskSchema.parse(response.data)
  },

  async createTask(data: CreateTask): Promise<Task> {
    const response = await apiClient.post('/tasks', data)
    return TaskSchema.parse(response.data)
  },

  async updateTask(id: string, data: UpdateTask): Promise<Task> {
    const response = await apiClient.patch(`/tasks/${id}`, data)
    return TaskSchema.parse(response.data)
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`)
  },
}
