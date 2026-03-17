---
name: angular-standards
description: Angular best practices and coding standards. Use when creating components, services, modules, or reviewing Angular code.
---

# Angular Standards

### Component Structure
- Use standalone components by default
- Follow the single responsibility principle
- Keep components focused and small (< 200 lines)
- Use OnPush change detection strategy when possible

### TypeScript Standards
- Enable strict mode in tsconfig.json
- Use explicit type annotations for all public methods
- Avoid using `any` type - prefer `unknown` or proper typing
- Use interfaces for data models

### Naming Conventions
- Components: `PascalCase` with descriptive names (e.g., `UserProfileComponent`)
- Services: `PascalCase` ending in `Service` (e.g., `AuthService`)
- Files: `kebab-case` (e.g., `user-profile.component.ts`)
- Variables/methods: `camelCase`

### File Organization
```
src/
├── app/
│   ├── core/          # Singleton services, guards, interceptors
│   ├── shared/        # Shared components, directives, pipes
│   ├── features/      # Feature modules
│   └── models/        # TypeScript interfaces and types
```

### Testing
- Write unit tests for all components and services
- Aim for 80%+ code coverage
- Use TestBed for component testing
- Mock dependencies properly

## Examples

### Component Example
```typescript
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  // Implementation
}
```

### Service Example
```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
}
```
