import { describe, it, expect } from 'vitest'
import {
  TaskSchema,
  TaskStatusSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  TaskListResponseSchema,
} from '../schema'

describe('TaskStatusSchema', () => {
  it('should accept valid statuses', () => {
    expect(TaskStatusSchema.parse('OPEN')).toBe('OPEN')
    expect(TaskStatusSchema.parse('IN_PROGRESS')).toBe('IN_PROGRESS')
    expect(TaskStatusSchema.parse('DONE')).toBe('DONE')
  })

  it('should reject invalid statuses', () => {
    expect(() => TaskStatusSchema.parse('INVALID')).toThrow()
    expect(() => TaskStatusSchema.parse('')).toThrow()
    expect(() => TaskStatusSchema.parse(123)).toThrow()
  })
})

describe('TaskSchema', () => {
  const validTask = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Test Task',
    description: 'A test description',
    status: 'OPEN',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  }

  it('should accept a valid task', () => {
    const result = TaskSchema.parse(validTask)
    expect(result.id).toBe(validTask.id)
    expect(result.title).toBe(validTask.title)
    expect(result.status).toBe('OPEN')
  })

  it('should accept null description', () => {
    const result = TaskSchema.parse({ ...validTask, description: null })
    expect(result.description).toBeNull()
  })

  it('should reject missing title', () => {
    expect(() => TaskSchema.parse({ ...validTask, title: undefined })).toThrow()
  })

  it('should reject empty title', () => {
    expect(() => TaskSchema.parse({ ...validTask, title: '' })).toThrow()
  })

  it('should reject invalid UUID', () => {
    expect(() => TaskSchema.parse({ ...validTask, id: 'not-a-uuid' })).toThrow()
  })

  it('should reject invalid datetime', () => {
    expect(() => TaskSchema.parse({ ...validTask, createdAt: 'not-a-date' })).toThrow()
  })
})

describe('CreateTaskSchema', () => {
  it('should accept valid creation data', () => {
    const result = CreateTaskSchema.parse({ title: 'New Task' })
    expect(result.title).toBe('New Task')
  })

  it('should accept optional description', () => {
    const result = CreateTaskSchema.parse({ title: 'New Task', description: 'Details' })
    expect(result.description).toBe('Details')
  })

  it('should reject empty title', () => {
    expect(() => CreateTaskSchema.parse({ title: '' })).toThrow()
  })

  it('should reject missing title', () => {
    expect(() => CreateTaskSchema.parse({})).toThrow()
  })
})

describe('UpdateTaskSchema', () => {
  it('should accept partial updates', () => {
    const result = UpdateTaskSchema.parse({ title: 'Updated' })
    expect(result.title).toBe('Updated')
  })

  it('should accept status update only', () => {
    const result = UpdateTaskSchema.parse({ status: 'DONE' })
    expect(result.status).toBe('DONE')
  })

  it('should accept empty update', () => {
    const result = UpdateTaskSchema.parse({})
    expect(result).toBeDefined()
  })

  it('should reject invalid status', () => {
    expect(() => UpdateTaskSchema.parse({ status: 'INVALID' })).toThrow()
  })
})

describe('TaskListResponseSchema', () => {
  it('should accept an array of valid tasks', () => {
    const tasks = [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Task 1',
        description: null,
        status: 'OPEN',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ]
    const result = TaskListResponseSchema.parse(tasks)
    expect(result).toHaveLength(1)
  })

  it('should accept empty array', () => {
    const result = TaskListResponseSchema.parse([])
    expect(result).toHaveLength(0)
  })

  it('should reject invalid items', () => {
    expect(() => TaskListResponseSchema.parse([{ invalid: true }])).toThrow()
  })
})
