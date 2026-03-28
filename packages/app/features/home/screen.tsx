import { YStack, H1, Text } from 'tamagui'
import { Link } from '../../navigation'

export function HomeScreen() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" gap="$4">
      <H1>Frontend Scaffold</H1>
      <Text color="$placeholderColor">Universal App with Solito + Tamagui</Text>
      <Link href="/tasks">
        <Text color="$primary">Go to Tasks</Text>
      </Link>
    </YStack>
  )
}
