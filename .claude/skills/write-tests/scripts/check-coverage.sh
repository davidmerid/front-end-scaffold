#!/bin/bash
# Check if test coverage meets the minimum threshold
# Usage: ./check-coverage.sh [threshold]

THRESHOLD="${1:-80}"
COVERAGE_FILE="coverage/coverage-summary.json"

if [ ! -f "$COVERAGE_FILE" ]; then
    echo "Coverage file not found. Run tests first with: npm test -- --code-coverage"
    exit 1
fi

# Extract line coverage percentage
COVERAGE=$(cat "$COVERAGE_FILE" | grep -o '"lines":{"total":[0-9]*,"covered":[0-9]*' | head -1)
TOTAL=$(echo "$COVERAGE" | grep -o '"total":[0-9]*' | grep -o '[0-9]*')
COVERED=$(echo "$COVERAGE" | grep -o '"covered":[0-9]*' | grep -o '[0-9]*')

if [ "$TOTAL" -eq 0 ]; then
    PERCENT=0
else
    PERCENT=$((COVERED * 100 / TOTAL))
fi

echo "Line Coverage: ${PERCENT}% (${COVERED}/${TOTAL})"
echo "Threshold: ${THRESHOLD}%"

if [ "$PERCENT" -lt "$THRESHOLD" ]; then
    echo "FAIL: Coverage is below threshold"
    exit 1
else
    echo "PASS: Coverage meets threshold"
    exit 0
fi
