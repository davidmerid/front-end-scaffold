import { TextArea as TamaguiTextArea, Label, YStack, Text, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

export const StyledTextArea = styled(TamaguiTextArea, {
  name: 'StyledTextArea',
  borderRadius: '$md',
  borderWidth: 1,
  borderColor: '$borderColor',
  backgroundColor: '$background',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  minHeight: 100,

  focusStyle: {
    borderColor: '$primary',
  },

  variants: {
    error: {
      true: {
        borderColor: '$error',
        focusStyle: {
          borderColor: '$error',
        },
      },
    },
  } as const,
})

export type TextAreaProps = GetProps<typeof StyledTextArea> & {
  label?: string
  helperText?: string
  errorMessage?: string
}

export function TextArea({ label, helperText, errorMessage, ...props }: TextAreaProps) {
  const hasError = !!errorMessage

  return (
    <YStack gap="$1">
      {label && (
        <Label fontSize="$2" fontWeight="500">
          {label}
        </Label>
      )}
      <StyledTextArea error={hasError} {...props} />
      {hasError ? (
        <Text fontSize="$1" color="$error">
          {errorMessage}
        </Text>
      ) : helperText ? (
        <Text fontSize="$1" color="$placeholderColor">
          {helperText}
        </Text>
      ) : null}
    </YStack>
  )
}
