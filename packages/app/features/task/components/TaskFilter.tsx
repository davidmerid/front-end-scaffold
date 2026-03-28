import { XStack } from 'tamagui'
import { Button } from '@scaffold/ui'
import { useTaskStore } from '../hooks/useTaskStore'
import type { TaskStatus } from '../domain/types'

const filters: Array<{ label: string; value: TaskStatus | null }> = [
  { label: 'All', value: null },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Done', value: 'DONE' },
]

export function TaskFilter() {
  const { filterStatus, setFilterStatus } = useTaskStore()

  return (
    <XStack gap="$2" flexWrap="wrap" marginBottom="$3">
      {filters.map((filter) => (
        <Button
          key={filter.label}
          variant={filterStatus === filter.value ? 'primary' : 'outline'}
          size="sm"
          onPress={() => setFilterStatus(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </XStack>
  )
}
