#!/bin/bash
# Generate Angular component with standard structure
# Usage: ./generate-component.sh <path/component-name>

COMPONENT_PATH="${1:-}"

if [ -z "$COMPONENT_PATH" ]; then
    echo "Usage: ./generate-component.sh <path/component-name>"
    echo "Example: ./generate-component.sh features/user/user-profile"
    exit 1
fi

echo "Generating component: $COMPONENT_PATH"

# Generate standalone component with OnPush change detection
npx ng generate component "$COMPONENT_PATH" \
    --standalone \
    --change-detection OnPush \
    --style scss \
    --skip-tests=false

echo ""
echo "Component generated at: src/app/${COMPONENT_PATH}"
echo ""
echo "Next steps:"
echo "1. Add to routing if needed"
echo "2. Implement component logic"
echo "3. Write unit tests"
