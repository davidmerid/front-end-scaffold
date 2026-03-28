import { Adapt, Dialog, Sheet, YStack } from 'tamagui'
import type { ReactNode } from 'react'

export function AdaptiveSheet({
  open,
  onOpenChange,
  title,
  children,
  snapPoints,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  children: ReactNode
  snapPoints?: number[]
}) {
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <Adapt when="sm" platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          animation="quick"
          snapPoints={snapPoints ?? [85, 50]}
        >
          <Sheet.Frame padding="$4">
            <Sheet.Handle />
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            { opacity: { overshootClamping: true } },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          padding="$4"
          gap="$3"
        >
          {title && <Dialog.Title>{title}</Dialog.Title>}
          <YStack>{children}</YStack>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
