import { Adapt, Select, Sheet, Text } from 'tamagui'
import type { SelectProps } from 'tamagui'

export type AdaptiveSelectOption = {
  label: string
  value: string
}

export type AdaptiveSelectProps = SelectProps & {
  options: AdaptiveSelectOption[]
  placeholder?: string
}

function ChevronDownIcon() {
  return <Text fontSize="$2">&#x25BC;</Text>
}

function CheckIcon() {
  return <Text fontSize="$2">&#x2713;</Text>
}

export function AdaptiveSelect({
  options,
  placeholder = 'Select...',
  ...props
}: AdaptiveSelectProps) {
  return (
    <Select {...props}>
      <Select.Trigger borderRadius="$md" iconAfter={ChevronDownIcon}>
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet modal dismissOnSnapToBottom snapPoints={[50]}>
          <Sheet.Frame>
            <Sheet.Handle />
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.Viewport>
          <Select.Group>
            {options.map((option, index) => (
              <Select.Item
                key={option.value}
                value={option.value}
                index={index}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator marginLeft="auto">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  )
}
