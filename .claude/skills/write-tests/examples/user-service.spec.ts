/**
 * Example test file demonstrating testing patterns for this project.
 * Use this as a reference when writing new tests.
 */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  // Test data
  const mockUser: User = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin'
  };

  const mockUsers: User[] = [
    mockUser,
    { id: '456', name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no outstanding HTTP requests
    httpMock.verify();
  });

  describe('getUser', () => {
    it('should return user when valid id provided', () => {
      // Arrange
      const userId = '123';

      // Act
      service.getUser(userId).subscribe(user => {
        // Assert
        expect(user).toEqual(mockUser);
        expect(user.id).toBe(userId);
      });

      // Assert HTTP request
      const req = httpMock.expectOne(`/api/users/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('should throw error when user not found', () => {
      // Arrange
      const userId = 'nonexistent';
      const errorResponse = { status: 404, statusText: 'Not Found' };

      // Act
      service.getUser(userId).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne(`/api/users/${userId}`);
      req.flush('User not found', errorResponse);
    });

    it('should handle empty id gracefully', () => {
      // Arrange & Act & Assert
      expect(() => service.getUser('')).toThrowError('User ID is required');
    });
  });

  describe('getUsers', () => {
    it('should return all users', () => {
      // Act
      service.getUsers().subscribe(users => {
        // Assert
        expect(users.length).toBe(2);
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne('/api/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should return empty array when no users exist', () => {
      // Act
      service.getUsers().subscribe(users => {
        // Assert
        expect(users).toEqual([]);
        expect(users.length).toBe(0);
      });

      const req = httpMock.expectOne('/api/users');
      req.flush([]);
    });
  });

  describe('createUser', () => {
    it('should create user and return created user', () => {
      // Arrange
      const newUser = { name: 'New User', email: 'new@example.com', role: 'user' };
      const createdUser = { id: '789', ...newUser };

      // Act
      service.createUser(newUser).subscribe(user => {
        // Assert
        expect(user.id).toBeDefined();
        expect(user.name).toBe(newUser.name);
      });

      const req = httpMock.expectOne('/api/users');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newUser);
      req.flush(createdUser);
    });

    it('should handle validation error', () => {
      // Arrange
      const invalidUser = { name: '', email: 'invalid-email', role: 'user' };

      // Act
      service.createUser(invalidUser).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(400);
        }
      });

      const req = httpMock.expectOne('/api/users');
      req.flush({ message: 'Validation failed' }, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateUser', () => {
    it('should update user and return updated user', () => {
      // Arrange
      const updates = { name: 'Updated Name' };
      const updatedUser = { ...mockUser, ...updates };

      // Act
      service.updateUser(mockUser.id, updates).subscribe(user => {
        // Assert
        expect(user.name).toBe('Updated Name');
      });

      const req = httpMock.expectOne(`/api/users/${mockUser.id}`);
      expect(req.request.method).toBe('PATCH');
      req.flush(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', () => {
      // Act
      service.deleteUser(mockUser.id).subscribe(result => {
        // Assert
        expect(result).toBeUndefined();
      });

      const req = httpMock.expectOne(`/api/users/${mockUser.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
