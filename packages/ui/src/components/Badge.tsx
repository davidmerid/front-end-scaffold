import { styled, Text, XStack } from 'tamagui'

const BadgeContainer = styled(XStack, {
  name: 'Badge',
  paddingHorizontal: '$2',
  paddingVertical: '$1',
  borderRadius: '$full',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    variant: {
      default: {
        backgroundColor: '$secondary',
      },
      primary: {
        backgroundColor: '$primary',
      },
      success: {
        backgroundColor: '$success',
      },
      error: {
        backgroundColor: '$error',
      },
      warning: {
        backgroundColor: '$warning',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})

const BadgeText = styled(Text, {
  name: 'BadgeText',
  fontSize: '$1',
  fontWeight: '600',
  color: '$backgroundLight',
})

export function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'error' | 'warning'
}) {
  return (
    <BadgeContainer variant={variant}>
      <BadgeText>{children}</BadgeText>
    </BadgeContainer>
  )
}
