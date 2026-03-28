import { z } from 'zod'
import {
  TaskSchema,
  TaskStatusSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  TaskListResponseSchema,
} from './schema'

export type Task = z.infer<typeof TaskSchema>
export type TaskStatus = z.infer<typeof TaskStatusSchema>
export type CreateTask = z.infer<typeof CreateTaskSchema>
export type UpdateTask = z.infer<typeof UpdateTaskSchema>
export type TaskListResponse = z.infer<typeof TaskListResponseSchema>
