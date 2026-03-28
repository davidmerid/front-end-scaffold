'use client'

import { TamaguiProvider } from 'tamagui'
import { config } from '@scaffold/ui'
import { AuthProvider } from '@scaffold/app/features/auth/providers/AuthProvider'
import { webAuthAdapter } from '../providers/WebAuthAdapter'
import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function AppProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // During SSR/SSG, render without AuthProvider to avoid Firebase init
    return <>{children}</>
  }

  return (
    <AuthProvider adapter={webAuthAdapter}>
      {children}
    </AuthProvider>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TamaguiProvider config={config} defaultTheme="light">
          <QueryClientProvider client={queryClient}>
            <AppProviders>
              {children}
            </AppProviders>
          </QueryClientProvider>
        </TamaguiProvider>
      </body>
    </html>
  )
}
