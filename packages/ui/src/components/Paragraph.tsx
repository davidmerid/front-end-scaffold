import { styled, Paragraph as TamaguiParagraph } from 'tamagui'

export const Paragraph = styled(TamaguiParagraph, {
  name: 'Paragraph',
  fontFamily: '$body',
  color: '$color',

  variants: {
    size: {
      sm: { fontSize: '$1' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$5' },
    },
    muted: {
      true: {
        color: '$placeholderColor',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})
