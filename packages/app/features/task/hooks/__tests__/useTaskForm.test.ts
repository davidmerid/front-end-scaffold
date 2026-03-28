import { describe, it, expect } from 'vitest'
import { CreateTaskSchema, UpdateTaskSchema } from '../../domain/schema'

// Test the Zod schemas that power form validation
describe('CreateTaskSchema (form validation)', () => {
  it('should validate correct create data', () => {
    const result = CreateTaskSchema.safeParse({ title: 'My Task', description: 'Details' })
    expect(result.success).toBe(true)
  })

  it('should reject empty title with error message', () => {
    const result = CreateTaskSchema.safeParse({ title: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title is required')
    }
  })

  it('should allow description to be optional', () => {
    const result = CreateTaskSchema.safeParse({ title: 'Title Only' })
    expect(result.success).toBe(true)
  })
})

describe('UpdateTaskSchema (form validation)', () => {
  it('should validate partial update with title', () => {
    const result = UpdateTaskSchema.safeParse({ title: 'Updated Title' })
    expect(result.success).toBe(true)
  })

  it('should validate partial update with status', () => {
    const result = UpdateTaskSchema.safeParse({ status: 'DONE' })
    expect(result.success).toBe(true)
  })

  it('should reject invalid status', () => {
    const result = UpdateTaskSchema.safeParse({ status: 'INVALID' })
    expect(result.success).toBe(false)
  })

  it('should accept completely empty update', () => {
    const result = UpdateTaskSchema.safeParse({})
    expect(result.success).toBe(true)
  })
})

// Verify form hook module exports
describe('useTaskForm module', () => {
  it('should export form hooks', async () => {
    const mod = await import('../useTaskForm')
    expect(mod.useCreateTaskForm).toBeDefined()
    expect(mod.useUpdateTaskForm).toBeDefined()
  })
})
