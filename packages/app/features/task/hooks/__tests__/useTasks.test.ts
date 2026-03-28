import { describe, it, expect, vi } from 'vitest'
import { taskKeys } from '../../domain/queryKeys'

// Test query key factory behavior (hooks require React context so we test keys and structure)
describe('taskKeys', () => {
  it('should create base keys', () => {
    expect(taskKeys.all).toEqual(['tasks'])
  })

  it('should create list keys', () => {
    expect(taskKeys.lists()).toEqual(['tasks', 'list'])
  })

  it('should create filtered list keys', () => {
    const filters = { status: 'OPEN' }
    expect(taskKeys.list(filters)).toEqual(['tasks', 'list', filters])
  })

  it('should create detail keys', () => {
    expect(taskKeys.details()).toEqual(['tasks', 'detail'])
  })

  it('should create specific detail key', () => {
    const id = '123'
    expect(taskKeys.detail(id)).toEqual(['tasks', 'detail', id])
  })
})

// Verify hook module exports
describe('useTasks module', () => {
  it('should export all CRUD hooks', async () => {
    const mod = await import('../useTasks')
    expect(mod.useTasks).toBeDefined()
    expect(mod.useTask).toBeDefined()
    expect(mod.useCreateTask).toBeDefined()
    expect(mod.useUpdateTask).toBeDefined()
    expect(mod.useDeleteTask).toBeDefined()
  })
})
