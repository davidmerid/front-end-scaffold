import { useState } from 'react'
import { YStack, H1, Text } from 'tamagui'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Button } from '@scaffold/ui'
import { useAuth } from './hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginScreen() {
  const { signIn } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      setError(null)
      await signIn(data.email, data.password)
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <YStack flex={1} justifyContent="center" padding="$4" gap="$4" maxWidth={400} marginHorizontal="auto" width="100%">
      <H1 textAlign="center">Sign In</H1>

      {error && (
        <Text color="$error" textAlign="center">
          {error}
        </Text>
      )}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Button
        variant="primary"
        size="lg"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        opacity={isSubmitting ? 0.7 : 1}
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>
    </YStack>
  )
}
