import { styled, YStack } from 'tamagui'

export const Card = styled(YStack, {
  name: 'Card',
  backgroundColor: '$background',
  borderRadius: '$lg',
  padding: '$4',
  borderWidth: 1,
  borderColor: '$borderColor',
  shadowColor: '$shadowColor',
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,

  variants: {
    elevated: {
      true: {
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
      },
    },
    pressable: {
      true: {
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
        pressStyle: {
          backgroundColor: '$backgroundPress',
          scale: 0.98,
        },
        cursor: 'pointer',
      },
    },
  } as const,
})
