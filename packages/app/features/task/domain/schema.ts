import { z } from 'zod'

export const TaskStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'DONE'])

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable(),
  status: TaskStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
})

export const UpdateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: TaskStatusSchema.optional(),
})

export const TaskListResponseSchema = z.array(TaskSchema)
