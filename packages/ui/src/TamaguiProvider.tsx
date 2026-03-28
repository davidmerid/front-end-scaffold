import { TamaguiProvider as TamaguiProviderOG } from 'tamagui'
import { config } from './tamagui.config'
import type { ReactNode } from 'react'

export function TamaguiProvider({
  children,
  defaultTheme = 'light',
}: {
  children: ReactNode
  defaultTheme?: 'light' | 'dark'
}) {
  return (
    <TamaguiProviderOG config={config} defaultTheme={defaultTheme}>
      {children}
    </TamaguiProviderOG>
  )
}
