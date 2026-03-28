import { YStack } from 'tamagui'
import { Controller } from 'react-hook-form'
import { Input, Button, AdaptiveSelect } from '@scaffold/ui'
import type { UseFormReturn } from 'react-hook-form'
import type { CreateTask, UpdateTask } from '../domain/types'

const statusOptions = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Done', value: 'DONE' },
]

export function TaskForm({
  form,
  onSubmit,
  isSubmitting,
  showStatus = false,
  submitLabel = 'Save',
}: {
  form: UseFormReturn<CreateTask> | UseFormReturn<UpdateTask>
  onSubmit: () => void
  isSubmitting?: boolean
  showStatus?: boolean
  submitLabel?: string
}) {
  return (
    <YStack gap="$3">
      <Controller
        control={form.control as UseFormReturn<CreateTask>['control']}
        name="title"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Input
            label="Title"
            placeholder="Enter task title"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value ?? ''}
            errorMessage={error?.message}
          />
        )}
      />

      <Controller
        control={form.control as UseFormReturn<CreateTask>['control']}
        name="description"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Input
            label="Description"
            placeholder="Enter task description"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value ?? ''}
            errorMessage={error?.message}
          />
        )}
      />

      {showStatus && (
        <Controller
          control={form.control as UseFormReturn<UpdateTask>['control']}
          name="status"
          render={({ field: { onChange, value } }) => (
            <AdaptiveSelect
              options={statusOptions}
              value={value ?? undefined}
              onValueChange={onChange}
              placeholder="Select status"
            />
          )}
        />
      )}

      <Button
        variant="primary"
        onPress={onSubmit}
        disabled={isSubmitting}
        opacity={isSubmitting ? 0.7 : 1}
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </Button>
    </YStack>
  )
}
