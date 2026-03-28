import { Badge } from '@scaffold/ui'
import type { TaskStatus } from '../domain/types'

const statusConfig: Record<TaskStatus, { label: string; variant: 'primary' | 'warning' | 'success' }> = {
  OPEN: { label: 'Open', variant: 'primary' },
  IN_PROGRESS: { label: 'In Progress', variant: 'warning' },
  DONE: { label: 'Done', variant: 'success' },
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const config = statusConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
