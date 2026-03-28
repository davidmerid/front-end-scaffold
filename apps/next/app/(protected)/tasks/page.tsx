'use client'

import dynamic from 'next/dynamic'

const TaskListScreen = dynamic(
  () => import('@scaffold/app/features/task/screen').then((m) => ({ default: m.TaskListScreen })),
  { ssr: false }
)

export default function TasksPage() {
  return <TaskListScreen />
}
