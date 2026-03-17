# Test File Template

Use this structure when creating test files.

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('{{ComponentOrServiceName}}', () => {
  // Dependencies
  let {{instanceName}}: {{ComponentOrServiceName}};
  {{#if hasHttpDependency}}
  let httpMock: HttpTestingController;
  {{/if}}
  {{#each mockServices}}
  let {{name}}: jasmine.SpyObj<{{type}}>;
  {{/each}}

  beforeEach(() => {
    // Create mocks
    {{#each mockServices}}
    {{name}} = jasmine.createSpyObj('{{type}}', [{{methods}}]);
    {{/each}}

    TestBed.configureTestingModule({
      imports: [
        {{imports}}
      ],
      providers: [
        {{providers}}
      ]
    });

    {{instanceName}} = TestBed.inject({{ComponentOrServiceName}});
    {{#if hasHttpDependency}}
    httpMock = TestBed.inject(HttpTestingController);
    {{/if}}
  });

  {{#if hasHttpDependency}}
  afterEach(() => {
    httpMock.verify();
  });
  {{/if}}

  describe('{{methodName}}', () => {
    it('should {{expectedBehavior}} when {{condition}}', () => {
      // Arrange
      {{arrangeCode}}

      // Act
      {{actCode}}

      // Assert
      {{assertCode}}
    });

    it('should handle error when {{errorCondition}}', () => {
      // Arrange
      {{errorArrangeCode}}

      // Act & Assert
      {{errorActAssertCode}}
    });
  });
});
```
