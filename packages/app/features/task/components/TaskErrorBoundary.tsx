import { Component } from 'react'
import { YStack, Text } from 'tamagui'
import { Button } from '@scaffold/ui'
import type { ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class TaskErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TaskErrorBoundary caught error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" gap="$3">
          <Text fontWeight="600">Something went wrong</Text>
          <Text color="$placeholderColor" textAlign="center">
            An error occurred while loading tasks. Please try again.
          </Text>
          <Button variant="outline" onPress={this.handleReset}>
            Try Again
          </Button>
        </YStack>
      )
    }

    return this.props.children
  }
}
