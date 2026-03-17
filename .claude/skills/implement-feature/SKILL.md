---
name: implement-feature
description: Implement a new feature following project standards
argument-hint: "[feature-description]"
disable-model-invocation: true
---

Implement the following feature: $ARGUMENTS

## Implementation Guidelines
- Follow the angular-standards skill
- Follow the project-conventions skill
- Include comprehensive unit tests (see testing-guidelines skill)
- Generate JSDoc documentation for all public methods
- Handle errors gracefully
- Consider accessibility (WCAG 2.1 AA)

## Deliverables
1. Feature implementation
2. Unit tests with 80%+ coverage
3. Integration tests for critical paths
4. Updated documentation
5. Example usage in comments

Please implement this feature step by step, ensuring all guidelines are followed.

## Resources

- For planning structure, see [template.md](template.md)
- For a complete example, see [examples/user-profile-edit.md](examples/user-profile-edit.md)
- To generate component: `bash scripts/generate-component.sh [path/name]`
- To generate service: `bash scripts/generate-service.sh [path/name]`
