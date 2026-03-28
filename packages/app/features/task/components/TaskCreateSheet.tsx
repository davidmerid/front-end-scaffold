import { AdaptiveSheet } from '@scaffold/ui'
import { TaskForm } from './TaskForm'
import { useCreateTaskForm } from '../hooks/useTaskForm'
import { useCreateTask } from '../hooks/useTasks'

export function TaskCreateSheet({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const form = useCreateTaskForm()
  const createTask = useCreateTask()

  const handleSubmit = form.handleSubmit(async (data) => {
    await createTask.mutateAsync(data)
    form.reset()
    onOpenChange(false)
  })

  return (
    <AdaptiveSheet open={open} onOpenChange={onOpenChange} title="Create Task">
      <TaskForm
        form={form}
        onSubmit={handleSubmit}
        isSubmitting={createTask.isPending}
        submitLabel="Create Task"
      />
    </AdaptiveSheet>
  )
}
