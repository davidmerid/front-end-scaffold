import { Input as TamaguiInput, Label, YStack, Text, styled } from 'tamagui'
import type { GetProps } from 'tamagui'
import type { ReactNode } from 'react'

export const StyledInput = styled(TamaguiInput, {
  name: 'StyledInput',
  borderRadius: '$md',
  borderWidth: 1,
  borderColor: '$borderColor',
  backgroundColor: '$background',
  paddingHorizontal: '$3',
  height: '$md',

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

export type InputProps = GetProps<typeof StyledInput> & {
  label?: string
  helperText?: string
  errorMessage?: string
}

export function Input({ label, helperText, errorMessage, ...props }: InputProps) {
  const hasError = !!errorMessage

  return (
    <YStack gap="$1">
      {label && (
        <Label htmlFor={props.id} fontSize="$2" fontWeight="500">
          {label}
        </Label>
      )}
      <StyledInput error={hasError} {...props} />
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
