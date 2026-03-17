# Feature Implementation Template

Use this structure when planning and implementing features.

---

## Feature Specification

### Overview
**Name**: {{feature_name}}
**Description**: {{brief_description}}
**Ticket**: {{ticket_reference}}

### Requirements
- {{requirement_1}}
- {{requirement_2}}
- {{requirement_3}}

### Acceptance Criteria
- [ ] {{criterion_1}}
- [ ] {{criterion_2}}
- [ ] {{criterion_3}}

---

## Implementation Plan

### Files to Create
| File | Purpose |
|------|---------|
| `{{path/to/component.ts}}` | {{purpose}} |
| `{{path/to/service.ts}}` | {{purpose}} |
| `{{path/to/model.ts}}` | {{purpose}} |

### Files to Modify
| File | Changes |
|------|---------|
| `{{path/to/existing.ts}}` | {{what_changes}} |

### Dependencies
- {{dependency_1}}
- {{dependency_2}}

---

## Component Structure

```typescript
@Component({
  selector: 'app-{{component-name}}',
  standalone: true,
  imports: [{{imports}}],
  templateUrl: './{{component-name}}.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class {{ComponentName}}Component {
  // Inputs
  {{inputs}}

  // Outputs
  {{outputs}}

  // State
  {{state}}

  // Methods
  {{methods}}
}
```

---

## Test Plan

### Unit Tests
- {{test_case_1}}
- {{test_case_2}}

### Integration Tests
- {{integration_test_1}}

### Edge Cases
- {{edge_case_1}}
- {{edge_case_2}}
