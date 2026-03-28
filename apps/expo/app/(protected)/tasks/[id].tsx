import { useLocalSearchParams } from 'expo-router'
import { TaskDetailScreen } from '@scaffold/app/features/task/detail-screen'

export default function TaskDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  if (!id) return null
  return <TaskDetailScreen id={id} />
}
