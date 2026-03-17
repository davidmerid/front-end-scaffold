#!/bin/bash
# Run linting on changed files only
# Usage: ./lint-changes.sh [base-branch]

BASE_BRANCH="${1:-main}"

echo "Checking files changed from ${BASE_BRANCH}..."
echo ""

# Get changed TypeScript files
CHANGED_FILES=$(git diff --name-only "$BASE_BRANCH" -- '*.ts' '*.tsx' | tr '\n' ' ')

if [ -z "$CHANGED_FILES" ]; then
    echo "No TypeScript files changed."
    exit 0
fi

echo "Changed files:"
echo "$CHANGED_FILES" | tr ' ' '\n'
echo ""

echo "Running ESLint..."
npx eslint $CHANGED_FILES

echo ""
echo "Running Prettier check..."
npx prettier --check $CHANGED_FILES
