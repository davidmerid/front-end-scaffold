# .claude Configuration Directory

This directory contains Claude Code skills for this project.

## Structure

```
.agent/
└── skills/
    ├── angular-standards/
    │   └── SKILL.md              # Angular best practices (auto-invoked)
    ├── project-conventions/
    │   └── SKILL.md              # Project-wide conventions (auto-invoked)
    ├── testing-guidelines/
    │   └── SKILL.md              # Testing standards (auto-invoked)
    ├── write-tests/
    │   ├── SKILL.md              # /write-tests command
    │   ├── template.md           # Test file structure template
    │   ├── examples/
    │   │   └── user-service.spec.ts  # Example test file
    │   └── scripts/
    │       ├── run-tests.sh      # Run tests for specific files
    │       └── check-coverage.sh # Verify coverage threshold
    ├── implement-feature/
    │   ├── SKILL.md              # /implement-feature command
    │   ├── template.md           # Feature spec template
    │   ├── examples/
    │   │   └── user-profile-edit.md  # Example feature implementation
    │   └── scripts/
    │       ├── generate-component.sh # Angular component generator
    │       └── generate-service.sh   # Angular service generator
    └── code-review/
        ├── SKILL.md              # /code-review command
        ├── template.md           # Review output template
        ├── examples/
        │   └── sample-review.md  # Example code review
        └── scripts/
            ├── gather-pr-info.sh # Fetch PR details via gh CLI
            └── lint-changes.sh   # Lint only changed files
```

## Skills

Skills extend what Claude can do. Each skill has a `SKILL.md` file with YAML frontmatter and instructions.

### Reference Skills (Auto-invoked by Claude)

These skills provide domain knowledge that Claude automatically references when relevant:

| Skill | Description |
|-------|-------------|
| **angular-standards** | Angular best practices, component architecture, TypeScript standards |
| **project-conventions** | Code style, git commits, documentation, error handling patterns |
| **testing-guidelines** | Unit/integration test patterns, coverage requirements, AAA pattern |

### Task Skills (User-invoked with /command)

These skills are invoked manually using slash commands:

| Command | Description |
|---------|-------------|
| `/write-tests [file]` | Write comprehensive tests for a file or component |
| `/implement-feature [description]` | Implement a new feature following project standards |
| `/code-review [files-or-pr]` | Perform a comprehensive code review |

## Adding a New Skill

1. Create a directory: `mkdir .agent/skills/my-skill`
2. Create `SKILL.md` with frontmatter and instructions:

```yaml
---
name: my-skill
description: What this skill does and when to use it
---

Your skill instructions here...
```

### Optional Frontmatter Fields

| Field | Description |
|-------|-------------|
| `name` | Display name (defaults to directory name) |
| `description` | What the skill does (used by Claude to decide when to apply) |
| `argument-hint` | Hint for autocomplete, e.g., `[file-path]` |
| `disable-model-invocation` | Set `true` to make it user-only (slash command) |
| `user-invocable` | Set `false` to hide from `/` menu (Claude-only) |
| `allowed-tools` | Tools Claude can use without asking permission |
| `context` | Set to `fork` to run in a subagent |

## Resources

- [Skills Documentation](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
