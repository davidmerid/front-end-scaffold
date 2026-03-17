#!/bin/bash
# Run tests for specific files or the entire project
# Usage: ./run-tests.sh [file-pattern]

set -e

FILE_PATTERN="${1:-}"

if [ -n "$FILE_PATTERN" ]; then
    echo "Running tests matching: $FILE_PATTERN"
    npx ng test --include="**/*${FILE_PATTERN}*.spec.ts" --watch=false --code-coverage
else
    echo "Running all tests..."
    npx ng test --watch=false --code-coverage
fi

echo ""
echo "Coverage report available at: coverage/index.html"
