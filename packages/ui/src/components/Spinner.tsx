import { Spinner as TamaguiSpinner, YStack } from 'tamagui'
import type { GetProps } from 'tamagui'

export type SpinnerProps = GetProps<typeof TamaguiSpinner> & {
  fullScreen?: boolean
}

export function Spinner({ fullScreen, ...props }: SpinnerProps) {
  if (fullScreen) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <TamaguiSpinner color="$primary" size="large" {...props} />
      </YStack>
    )
  }

  return <TamaguiSpinner color="$primary" {...props} />
}
