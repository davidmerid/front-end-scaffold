import { useState } from 'react'
import { YStack, XStack, Text, H1 } from 'tamagui'
import { Button, Spinner, AdaptiveSheet } from '@scaffold/ui'
import { useRouter } from '../../navigation'
import { useTask, useUpdateTask, useDeleteTask } from './hooks/useTasks'
import { useUpdateTaskForm } from './hooks/useTaskForm'
import { TaskStatusBadge } from './components/TaskStatusBadge'
import { TaskForm } from './components/TaskForm'
import { TaskErrorBoundary } from './components/TaskErrorBoundary'

function TaskDetailContent({ id }: { id: string }) {
  const { data: task, isLoading } = useTask(id)
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()
  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const form = useUpdateTaskForm(
    task ? { title: task.title, description: task.description ?? '', status: task.status } : undefined
  )

  if (isLoading) {
    return <Spinner fullScreen />
  }

  if (!task) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>Task not found</Text>
      </YStack>
    )
  }

  const handleUpdate = form.handleSubmit(async (data) => {
    await updateTask.mutateAsync({ id, data })
    setEditOpen(false)
  })

  const handleDelete = async () => {
    await deleteTask.mutateAsync(id)
    setDeleteOpen(false)
    router.back()
  }

  return (
    <YStack flex={1} padding="$4" gap="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <H1 flex={1}>{task.title}</H1>
        <TaskStatusBadge status={task.status} />
      </XStack>

      {task.description && (
        <Text color="$placeholderColor">{task.description}</Text>
      )}

      <XStack gap="$2">
        <Button variant="outline" flex={1} onPress={() => setEditOpen(true)}>
          Edit
        </Button>
        <Button variant="destructive" flex={1} onPress={() => setDeleteOpen(true)}>
          Delete
        </Button>
      </XStack>

      <Text color="$placeholderColor" fontSize="$1">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </Text>

      {/* Edit Sheet */}
      <AdaptiveSheet open={editOpen} onOpenChange={setEditOpen} title="Edit Task">
        <TaskForm
          form={form}
          onSubmit={handleUpdate}
          isSubmitting={updateTask.isPending}
          showStatus
          submitLabel="Update Task"
        />
      </AdaptiveSheet>

      {/* Delete Confirmation Sheet */}
      <AdaptiveSheet open={deleteOpen} onOpenChange={setDeleteOpen} title="Delete Task">
        <YStack gap="$3">
          <Text>Are you sure you want to delete this task? This action cannot be undone.</Text>
          <XStack gap="$2">
            <Button variant="outline" flex={1} onPress={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              flex={1}
              onPress={handleDelete}
              disabled={deleteTask.isPending}
            >
              {deleteTask.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </XStack>
        </YStack>
      </AdaptiveSheet>
    </YStack>
  )
}

export function TaskDetailScreen({ id }: { id: string }) {
  return (
    <TaskErrorBoundary>
      <TaskDetailContent id={id} />
    </TaskErrorBoundary>
  )
}
