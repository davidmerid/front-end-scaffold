'use client'

import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

const TaskDetailScreen = dynamic(
  () => import('@scaffold/app/features/task/detail-screen').then((m) => ({ default: m.TaskDetailScreen })),
  { ssr: false }
)

export default function TaskDetailPage() {
  const params = useParams<{ id: string }>()
  if (!params.id) return null
  return <TaskDetailScreen id={params.id} />
}
