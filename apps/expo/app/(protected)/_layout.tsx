import { Stack, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { useAuth } from '@scaffold/app/features/auth/hooks/useAuth'

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router, segments])

  if (isLoading) {
    return null
  }

  return <Stack />
}
