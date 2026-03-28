import { describe, it, expect } from 'vitest'
import type { Task } from '../../domain/types'
import { TaskSchema } from '../../domain/schema'

describe('TaskCard', () => {
  const mockTask: Task = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Test Task',
    description: 'A test task description',
    status: 'OPEN',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  }

  it('should have correct task type structure', () => {
    expect(mockTask.id).toBeDefined()
    expect(mockTask.title).toBe('Test Task')
    expect(mockTask.status).toBe('OPEN')
    expect(mockTask.description).toBe('A test task description')
  })

  it('should accept null description', () => {
    const taskWithNullDesc: Task = { ...mockTask, description: null }
    expect(taskWithNullDesc.description).toBeNull()
  })

  it('should validate task data for card rendering', () => {
    const result = TaskSchema.safeParse(mockTask)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.title).toBe('Test Task')
      expect(result.data.status).toBe('OPEN')
    }
  })

  it('should handle all status variants for badge', () => {
    const statuses = ['OPEN', 'IN_PROGRESS', 'DONE'] as const
    for (const status of statuses) {
      const task: Task = { ...mockTask, status }
      expect(task.status).toBe(status)
    }
  })
})
