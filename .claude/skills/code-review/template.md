# Code Review Output Template

Use this format when providing code review feedback.

---

## Summary

**Status**: {{Approved | Needs Changes | Rejected}}

{{1-2 sentence overall assessment}}

## Changes Reviewed

{{List of files reviewed}}

## Findings

### Critical Issues
{{Issues that must be fixed before merging}}

- [ ] **{{file:line}}**: {{description}}
  ```{{language}}
  // Current
  {{problematic_code}}

  // Suggested
  {{suggested_fix}}
  ```

### Suggestions
{{Non-blocking improvements}}

- **{{file:line}}**: {{suggestion}}

### Positive Notes
{{Good patterns worth highlighting}}

- {{positive_observation}}

## Checklist Results

| Category | Status | Notes |
|----------|--------|-------|
| Code Quality | {{Pass/Fail}} | {{notes}} |
| Testing | {{Pass/Fail}} | {{notes}} |
| Documentation | {{Pass/Fail}} | {{notes}} |
| Performance | {{Pass/Fail}} | {{notes}} |
| Security | {{Pass/Fail}} | {{notes}} |
| Accessibility | {{Pass/Fail}} | {{notes}} |

## Action Items

1. {{Required action}}
2. {{Required action}}
