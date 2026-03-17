---
name: code-review
description: Perform a comprehensive code review
argument-hint: "[files-or-pr]"
disable-model-invocation: true
---

Perform a comprehensive code review of: $ARGUMENTS

## Review Checklist

### Code Quality
- Follows angular-standards skill
- Follows project-conventions skill
- Follows testing-guidelines skill
- Code is readable and maintainable
- No code smells or anti-patterns
- Proper error handling

### Testing
- Unit tests included
- Tests cover edge cases
- Tests follow naming conventions
- Coverage meets 80% minimum
- Integration tests for critical paths

### Documentation
- JSDoc comments for public methods
- README updated if needed
- Inline comments for complex logic

### Performance
- No obvious performance issues
- Proper use of change detection
- Observables unsubscribed properly
- Lazy loading where appropriate

### Security
- No hardcoded secrets
- Input validation present
- XSS prevention considered
- Proper authentication/authorization

### Accessibility
- Keyboard navigation works
- ARIA labels where needed
- Color contrast meets WCAG 2.1 AA

## Output Format
Provide:
1. Overall assessment
2. Specific issues found (if any)
3. Suggestions for improvement
4. Security concerns (if any)
5. Approval status (Approved / Needs Changes / Rejected)

## Resources

- For output format, see [template.md](template.md)
- For a complete example, see [examples/sample-review.md](examples/sample-review.md)
- To gather PR info: `bash scripts/gather-pr-info.sh [pr-number]`
- To lint changed files: `bash scripts/lint-changes.sh [base-branch]`
