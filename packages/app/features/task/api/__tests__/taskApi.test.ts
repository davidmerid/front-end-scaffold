import { describe, it, expect, vi, beforeEach } from 'vitest'
import { taskApi } from '../taskApi'
import { apiClient } from '../../../auth/api/apiClient'

vi.mock('../../../auth/api/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

const mockTask = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  title: 'Test Task',
  description: 'Description',
  status: 'OPEN',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('taskApi', () => {
  describe('getTasks', () => {
    it('should fetch and validate tasks', async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: [mockTask] })

      const result = await taskApi.getTasks()
      expect(apiClient.get).toHaveBeenCalledWith('/tasks')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(mockTask.id)
    })

    it('should throw on invalid response', async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: [{ invalid: true }] })

      await expect(taskApi.getTasks()).rejects.toThrow()
    })
  })

  describe('getTask', () => {
    it('should fetch and validate a single task', async () => {
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockTask })

      const result = await taskApi.getTask(mockTask.id)
      expect(apiClient.get).toHaveBeenCalledWith(`/tasks/${mockTask.id}`)
      expect(result.title).toBe(mockTask.title)
    })
  })

  describe('createTask', () => {
    it('should create and validate a task', async () => {
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockTask })

      const result = await taskApi.createTask({ title: 'Test Task', description: 'Description' })
      expect(apiClient.post).toHaveBeenCalledWith('/tasks', { title: 'Test Task', description: 'Description' })
      expect(result.id).toBe(mockTask.id)
    })
  })

  describe('updateTask', () => {
    it('should update and validate a task', async () => {
      const updatedTask = { ...mockTask, title: 'Updated' }
      vi.mocked(apiClient.patch).mockResolvedValue({ data: updatedTask })

      const result = await taskApi.updateTask(mockTask.id, { title: 'Updated' })
      expect(apiClient.patch).toHaveBeenCalledWith(`/tasks/${mockTask.id}`, { title: 'Updated' })
      expect(result.title).toBe('Updated')
    })
  })

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      vi.mocked(apiClient.delete).mockResolvedValue({})

      await taskApi.deleteTask(mockTask.id)
      expect(apiClient.delete).toHaveBeenCalledWith(`/tasks/${mockTask.id}`)
    })
  })
})
