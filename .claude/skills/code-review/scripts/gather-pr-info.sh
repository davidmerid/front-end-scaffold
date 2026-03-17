#!/bin/bash
# Gather PR information for code review
# Usage: ./gather-pr-info.sh [pr-number]

PR_NUMBER="${1:-}"

if [ -z "$PR_NUMBER" ]; then
    echo "Usage: ./gather-pr-info.sh <pr-number>"
    exit 1
fi

echo "=== PR #${PR_NUMBER} Information ==="
echo ""

echo "--- PR Details ---"
gh pr view "$PR_NUMBER" --json title,body,author,state,additions,deletions,changedFiles

echo ""
echo "--- Changed Files ---"
gh pr diff "$PR_NUMBER" --name-only

echo ""
echo "--- PR Comments ---"
gh pr view "$PR_NUMBER" --comments

echo ""
echo "--- CI Status ---"
gh pr checks "$PR_NUMBER"
