import { styled, YStack } from 'tamagui'
import { Platform } from 'react-native'

export const SafeArea = styled(YStack, {
  name: 'SafeArea',
  flex: 1,
  ...(Platform.OS !== 'web'
    ? {
        // On native, accommodate safe area insets
        paddingTop: '$4',
        paddingBottom: '$2',
      }
    : {}),
})
