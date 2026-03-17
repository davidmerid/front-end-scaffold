#!/bin/bash
# Generate Angular service with standard structure
# Usage: ./generate-service.sh <path/service-name>

SERVICE_PATH="${1:-}"

if [ -z "$SERVICE_PATH" ]; then
    echo "Usage: ./generate-service.sh <path/service-name>"
    echo "Example: ./generate-service.sh core/services/user"
    exit 1
fi

echo "Generating service: $SERVICE_PATH"

npx ng generate service "$SERVICE_PATH" --skip-tests=false

echo ""
echo "Service generated at: src/app/${SERVICE_PATH}.service.ts"
echo ""
echo "Next steps:"
echo "1. Inject HttpClient if needed"
echo "2. Add methods"
echo "3. Write unit tests"
