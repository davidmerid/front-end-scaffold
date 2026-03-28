import { styled, YStack } from 'tamagui'

export const Container = styled(YStack, {
  name: 'Container',
  width: '100%',
  maxWidth: 1200,
  marginHorizontal: 'auto',
  paddingHorizontal: '$4',

  variants: {
    size: {
      sm: { maxWidth: 640 },
      md: { maxWidth: 768 },
      lg: { maxWidth: 1024 },
      xl: { maxWidth: 1200 },
    },
  } as const,

  defaultVariants: {
    size: 'xl',
  },
})
