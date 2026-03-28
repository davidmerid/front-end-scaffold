import { XStack, Text } from 'tamagui'
import { Card } from '@scaffold/ui'
import { Link } from '../../../navigation'
import { TaskStatusBadge } from './TaskStatusBadge'
import type { Task } from '../domain/types'

export function TaskCard({ task }: { task: Task }) {
  return (
    <Link href={`/tasks/${task.id}`}>
      <Card pressable marginBottom="$2">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="600" flex={1} numberOfLines={1}>
            {task.title}
          </Text>
          <TaskStatusBadge status={task.status} />
        </XStack>
        {task.description && (
          <Text color="$placeholderColor" numberOfLines={2} marginTop="$1">
            {task.description}
          </Text>
        )}
      </Card>
    </Link>
  )
}
