---
name: project-conventions
description: Project-wide conventions, patterns, and standards. Use for architectural decisions, code style, git commits, and code reviews.
---

# Project Conventions

### Code Style
- Use Prettier for code formatting (auto-format on save)
- Use ESLint for code linting
- Follow the project's .editorconfig settings
- Maximum line length: 100 characters
- Use 2 spaces for indentation

### Git Commit Conventions
Follow Conventional Commits format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:
```
feat(auth): add password reset functionality

Implement password reset flow with email verification.
Includes new reset-password component and service.

Closes #123
```

### Branch Naming
```
<type>/<ticket-number>-<short-description>
```

Examples:
- `feat/PROJ-123-user-authentication`
- `fix/PROJ-456-login-bug`
- `refactor/PROJ-789-cleanup-services`

### Documentation
- Add JSDoc comments for all public methods and complex logic
- Include examples in JSDoc for non-obvious usage
- Update README.md when adding new features
- Document all environment variables in .env.example

### Error Handling
- Always handle errors gracefully
- Log errors with appropriate context
- Show user-friendly error messages
- Never expose sensitive information in error messages

### Code Review Standards
- All code must be reviewed before merging
- PRs should be < 400 lines when possible
- Include tests with all PRs
- Update documentation as needed
- Address all review comments before merging

### Performance Guidelines
- Lazy load feature modules
- Use trackBy with *ngFor
- Unsubscribe from observables in ngOnDestroy
- Optimize images and assets
- Use OnPush change detection where possible

## Examples

### JSDoc Example
```typescript
/**
 * Retrieves user data from the API.
 *
 * @param userId - The unique identifier of the user
 * @returns Observable containing user data
 * @throws {HttpErrorResponse} When user is not found or server error occurs
 *
 * @example
 * ```typescript
 * this.userService.getUser('123').subscribe(
 *   user => console.log(user),
 *   error => console.error('Failed to load user', error)
 * );
 * ```
 */
getUser(userId: string): Observable<User> {
  return this.http.get<User>(`/api/users/${userId}`);
}
```

### Error Handling Example
```typescript
getUserData(id: string): void {
  this.userService.getUser(id)
    .pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        this.notificationService.showError('Failed to load user data. Please try again.');
        return of(null);
      })
    )
    .subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
}
```

### Subscription Management Example
```typescript
export class UserProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.userService.getUser(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```
