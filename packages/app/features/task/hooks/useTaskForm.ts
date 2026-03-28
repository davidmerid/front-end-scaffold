import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateTaskSchema, UpdateTaskSchema } from '../domain/schema'
import type { CreateTask, UpdateTask } from '../domain/types'

export function useCreateTaskForm() {
  return useForm<CreateTask>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })
}

export function useUpdateTaskForm(defaultValues?: Partial<UpdateTask>) {
  return useForm<UpdateTask>({
    resolver: zodResolver(UpdateTaskSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      status: defaultValues?.status,
    },
  })
}
