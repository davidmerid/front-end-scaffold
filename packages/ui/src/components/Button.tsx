import { styled, Button as TamaguiButton } from 'tamagui'

export const Button = styled(TamaguiButton, {
  name: 'Button',
  borderRadius: '$md',
  fontWeight: '600',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$backgroundLight',
        hoverStyle: {
          backgroundColor: '$primaryLight',
        },
        pressStyle: {
          backgroundColor: '$primaryDark',
        },
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$backgroundLight',
        hoverStyle: {
          backgroundColor: '$secondaryLight',
        },
        pressStyle: {
          backgroundColor: '$secondaryDark',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        color: '$color',
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
        pressStyle: {
          backgroundColor: '$backgroundPress',
        },
      },
      destructive: {
        backgroundColor: '$error',
        color: '$backgroundLight',
        hoverStyle: {
          backgroundColor: '$errorLight',
        },
        pressStyle: {
          backgroundColor: '$error',
        },
      },
    },
    size: {
      sm: {
        height: 32,
        paddingHorizontal: '$3',
        fontSize: 14,
      },
      md: {
        height: 40,
        paddingHorizontal: '$4',
        fontSize: 16,
      },
      lg: {
        height: 48,
        paddingHorizontal: '$5',
        fontSize: 18,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
