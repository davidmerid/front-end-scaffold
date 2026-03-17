# Feature: User Profile Editing

## Overview
**Name**: User Profile Edit
**Description**: Allow users to edit their profile information
**Ticket**: PROJ-456

## Requirements
- Users can edit their name, email, and bio
- Form validates input before submission
- Changes are saved to the backend API
- Success/error messages are displayed
- Form is accessible via keyboard navigation

## Acceptance Criteria
- [x] Edit form displays current user data
- [x] Name field validates: required, 2-50 characters
- [x] Email field validates: required, valid email format
- [x] Bio field validates: optional, max 500 characters
- [x] Save button disabled until form is valid and dirty
- [x] Success toast shown on save
- [x] Error message shown on failure
- [x] Cancel button reverts unsaved changes

---

## Implementation

### Files Created

**user-profile-edit.component.ts**
```typescript
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { NotificationService } from '@core/services/notification.service';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private notifications = inject(NotificationService);

  form: FormGroup;
  loading = false;
  private originalValues: Partial<User> = {};

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', [Validators.maxLength(500)]]
    });
  }

  private loadUserData(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.originalValues = { name: user.name, email: user.email, bio: user.bio };
      this.form.patchValue(this.originalValues);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.userService.updateCurrentUser(this.form.value).subscribe({
      next: () => {
        this.notifications.success('Profile updated successfully');
        this.originalValues = { ...this.form.value };
        this.form.markAsPristine();
        this.loading = false;
      },
      error: (err) => {
        this.notifications.error('Failed to update profile. Please try again.');
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.form.patchValue(this.originalValues);
    this.form.markAsPristine();
  }

  get canSave(): boolean {
    return this.form.valid && this.form.dirty && !this.loading;
  }
}
```

**user-profile-edit.component.html**
```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" class="profile-form">
  <div class="form-field">
    <label for="name">Name</label>
    <input
      id="name"
      formControlName="name"
      type="text"
      autocomplete="name"
      [attr.aria-invalid]="form.get('name')?.invalid && form.get('name')?.touched"
    />
    @if (form.get('name')?.errors?.['required'] && form.get('name')?.touched) {
      <span class="error" role="alert">Name is required</span>
    }
    @if (form.get('name')?.errors?.['minlength']) {
      <span class="error" role="alert">Name must be at least 2 characters</span>
    }
  </div>

  <div class="form-field">
    <label for="email">Email</label>
    <input
      id="email"
      formControlName="email"
      type="email"
      autocomplete="email"
      [attr.aria-invalid]="form.get('email')?.invalid && form.get('email')?.touched"
    />
    @if (form.get('email')?.errors?.['required'] && form.get('email')?.touched) {
      <span class="error" role="alert">Email is required</span>
    }
    @if (form.get('email')?.errors?.['email']) {
      <span class="error" role="alert">Please enter a valid email</span>
    }
  </div>

  <div class="form-field">
    <label for="bio">Bio</label>
    <textarea
      id="bio"
      formControlName="bio"
      rows="4"
      [attr.aria-invalid]="form.get('bio')?.invalid && form.get('bio')?.touched"
    ></textarea>
    <span class="char-count">{{ form.get('bio')?.value?.length || 0 }}/500</span>
  </div>

  <div class="form-actions">
    <button type="button" (click)="onCancel()" [disabled]="!form.dirty">
      Cancel
    </button>
    <button type="submit" [disabled]="!canSave">
      {{ loading ? 'Saving...' : 'Save Changes' }}
    </button>
  </div>
</form>
```

### Tests Created

```typescript
describe('UserProfileEditComponent', () => {
  // ... setup ...

  it('should load current user data into form', () => {
    expect(component.form.get('name')?.value).toBe('John Doe');
    expect(component.form.get('email')?.value).toBe('john@example.com');
  });

  it('should disable save button when form is pristine', () => {
    expect(component.canSave).toBeFalse();
  });

  it('should enable save button when form is dirty and valid', () => {
    component.form.patchValue({ name: 'Jane Doe' });
    component.form.markAsDirty();
    expect(component.canSave).toBeTrue();
  });

  it('should show success notification on save', () => {
    component.form.patchValue({ name: 'Jane Doe' });
    component.form.markAsDirty();
    component.onSubmit();
    // ... mock response ...
    expect(notificationService.success).toHaveBeenCalledWith('Profile updated successfully');
  });

  it('should revert changes on cancel', () => {
    component.form.patchValue({ name: 'Changed Name' });
    component.onCancel();
    expect(component.form.get('name')?.value).toBe('John Doe');
  });
});
```
