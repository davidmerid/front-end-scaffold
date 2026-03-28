import { TamaguiProvider } from 'tamagui'
import { Stack } from 'expo-router'
import { config } from '@scaffold/ui'
import { AuthProvider } from '@scaffold/app/features/auth/providers/AuthProvider'
import { nativeAuthAdapter } from '../providers/NativeAuthAdapter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <AuthProvider adapter={nativeAuthAdapter}>
          <Stack />
        </AuthProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  )
}
