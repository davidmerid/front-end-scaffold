---
name: testing-guidelines
description: Testing standards for unit, integration, and e2e tests. Use when writing, refactoring, or reviewing tests.
---

# Testing Guidelines

### General Principles
- Write tests before or alongside implementation (TDD approach preferred)
- Each test should be independent and isolated
- Use descriptive test names that explain what is being tested
- Follow AAA pattern: Arrange, Act, Assert

### Test Naming Convention
```
test_should_<expected_behavior>_when_<condition>()
```

Examples:
- `test_should_return_user_when_valid_id_provided()`
- `test_should_throw_error_when_user_not_found()`

### Coverage Requirements
- Minimum 80% code coverage
- 100% coverage for critical business logic
- All public methods must have tests
- Edge cases and error scenarios must be tested

### Unit Testing
- Test one unit of work at a time
- Mock external dependencies
- Use test doubles (mocks, stubs, spies) appropriately
- Keep tests fast (< 100ms per test)

### Integration Testing
- Test interactions between components/services
- Use real implementations where practical
- Mock only external APIs and databases
- Test critical user flows

### Test Structure
```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;
  let mockService: jasmine.SpyObj<ServiceName>;

  beforeEach(() => {
    // Arrange: Set up test environment
    mockService = jasmine.createSpyObj('ServiceName', ['method']);

    TestBed.configureTestingModule({
      imports: [ComponentName],
      providers: [
        { provide: ServiceName, useValue: mockService }
      ]
    });

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
  });

  it('should_do_something_when_condition', () => {
    // Arrange
    const expectedValue = 'test';
    mockService.method.and.returnValue(of(expectedValue));

    // Act
    component.doSomething();

    // Assert
    expect(component.value).toBe(expectedValue);
  });
});
```

## Examples

### Unit Test Example
```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should_return_user_when_valid_id_provided', () => {
    const mockUser: User = { id: '1', name: 'Test User' };

    service.getUser('1').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('/api/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
```

### Component Test Example
```typescript
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should_call_auth_service_when_form_submitted_with_valid_data', () => {
    const credentials = { username: 'test', password: 'pass123' };
    authService.login.and.returnValue(of({ token: 'abc123' }));

    component.loginForm.setValue(credentials);
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(credentials);
  });
});
```
