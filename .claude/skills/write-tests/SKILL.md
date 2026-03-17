---
name: write-tests
description: Write comprehensive tests for a component, service, or file
argument-hint: "[file-path]"
disable-model-invocation: true
---

Write comprehensive tests for $ARGUMENTS.

## Testing Requirements
- Follow the testing-guidelines skill
- Achieve minimum 80% code coverage
- Test all public methods
- Include edge cases and error scenarios
- Use descriptive test names following the convention

## Test Types to Include
- Unit tests
- Integration tests (if applicable)
- Edge cases
- Error handling
- Mock dependencies properly

## Test Quality Standards
1. Independent and isolated
2. Fast (< 100ms per test)
3. Readable and maintainable
4. Following AAA pattern (Arrange, Act, Assert)

## Resources

- For test file structure, see [template.md](template.md)
- For a complete example, see [examples/user-service.spec.ts](examples/user-service.spec.ts)
- To run tests: `bash scripts/run-tests.sh [file-pattern]`
- To check coverage: `bash scripts/check-coverage.sh [threshold]`
