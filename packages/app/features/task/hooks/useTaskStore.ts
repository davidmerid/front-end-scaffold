import { create } from 'zustand'
import type { TaskStatus } from '../domain/types'

interface TaskStoreState {
  selectedTaskId: string | null
  isFilterOpen: boolean
  filterStatus: TaskStatus | null
  setSelectedTaskId: (id: string | null) => void
  setIsFilterOpen: (open: boolean) => void
  setFilterStatus: (status: TaskStatus | null) => void
}

export const useTaskStore = create<TaskStoreState>((set) => ({
  selectedTaskId: null,
  isFilterOpen: false,
  filterStatus: null,
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
  setIsFilterOpen: (open) => set({ isFilterOpen: open }),
  setFilterStatus: (status) => set({ filterStatus: status }),
}))
