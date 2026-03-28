import { useState, useCallback, useMemo } from 'react'
import { YStack, XStack, Text, H1 } from 'tamagui'
import { FlashList } from '@shopify/flash-list'
import { Button } from '@scaffold/ui'
import { useTasks } from './hooks/useTasks'
import { useTaskStore } from './hooks/useTaskStore'
import { TaskCard } from './components/TaskCard'
import { TaskFilter } from './components/TaskFilter'
import { TaskCreateSheet } from './components/TaskCreateSheet'
import { TaskErrorBoundary } from './components/TaskErrorBoundary'
import type { Task } from './domain/types'

function TaskListContent() {
  const { data: tasks, isLoading, refetch, isRefetching } = useTasks()
  const { filterStatus } = useTaskStore()
  const [createOpen, setCreateOpen] = useState(false)

  const filteredTasks = useMemo(() => {
    if (!tasks) return []
    if (!filterStatus) return tasks
    return tasks.filter((task) => task.status === filterStatus)
  }, [tasks, filterStatus])

  const handleRefresh = useCallback(() => {
    refetch()
  }, [refetch])

  const renderItem = useCallback(({ item }: { item: Task }) => {
    return <TaskCard task={item} />
  }, [])

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color="$placeholderColor">Loading tasks...</Text>
      </YStack>
    )
  }

  return (
    <YStack flex={1} padding="$4">
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
        <H1>Tasks</H1>
        <Button variant="primary" size="sm" onPress={() => setCreateOpen(true)}>
          + New Task
        </Button>
      </XStack>

      <TaskFilter />

      {filteredTasks.length === 0 ? (
        <YStack flex={1} justifyContent="center" alignItems="center" gap="$2">
          <Text fontWeight="600">No tasks found</Text>
          <Text color="$placeholderColor">
            {filterStatus ? 'Try a different filter' : 'Create your first task'}
          </Text>
        </YStack>
      ) : (
        <FlashList
          data={filteredTasks}
          renderItem={renderItem}
          estimatedItemSize={80}
          onRefresh={handleRefresh}
          refreshing={isRefetching}
          keyExtractor={(item) => item.id}
        />
      )}

      <TaskCreateSheet open={createOpen} onOpenChange={setCreateOpen} />
    </YStack>
  )
}

export function TaskListScreen() {
  return (
    <TaskErrorBoundary>
      <TaskListContent />
    </TaskErrorBoundary>
  )
}
