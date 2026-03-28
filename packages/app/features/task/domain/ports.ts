import type { Task, CreateTask, UpdateTask } from './types'

export interface TaskApiPort {
  getTasks(): Promise<Task[]>
  getTask(id: string): Promise<Task>
  createTask(data: CreateTask): Promise<Task>
  updateTask(id: string, data: UpdateTask): Promise<Task>
  deleteTask(id: string): Promise<void>
}
