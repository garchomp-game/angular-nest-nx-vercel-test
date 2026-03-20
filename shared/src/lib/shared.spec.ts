import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ApiResponse,
  ApiErrorResponse,
} from './shared';

describe('Shared Types', () => {
  describe('User interface', () => {
    it('should accept valid user object', () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };
      expect(user.id).toBe(1);
      expect(user.email).toBe('test@example.com');
      expect(user.name).toBe('Test User');
    });

    it('should accept null name', () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        name: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };
      expect(user.name).toBeNull();
    });
  });

  describe('CreateUserRequest interface', () => {
    it('should accept valid create request', () => {
      const request: CreateUserRequest = {
        email: 'test@example.com',
        name: 'Test User',
      };
      expect(request.email).toBe('test@example.com');
    });

    it('should accept request without name', () => {
      const request: CreateUserRequest = {
        email: 'test@example.com',
      };
      expect(request.name).toBeUndefined();
    });
  });

  describe('UpdateUserRequest interface', () => {
    it('should accept partial updates', () => {
      const request: UpdateUserRequest = {
        name: 'Updated Name',
      };
      expect(request.name).toBe('Updated Name');
      expect(request.email).toBeUndefined();
    });
  });

  describe('ApiResponse interface', () => {
    it('should wrap data correctly', () => {
      const response: ApiResponse<User> = {
        data: {
          id: 1,
          email: 'test@example.com',
          name: 'Test',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
        statusCode: 200,
        timestamp: '2024-01-01T00:00:00.000Z',
      };
      expect(response.statusCode).toBe(200);
      expect(response.data.id).toBe(1);
    });
  });

  describe('ApiErrorResponse interface', () => {
    it('should contain error details', () => {
      const error: ApiErrorResponse = {
        statusCode: 404,
        message: 'Not Found',
        error: 'Not Found',
        timestamp: '2024-01-01T00:00:00.000Z',
        path: '/api/users/999',
      };
      expect(error.statusCode).toBe(404);
      expect(error.path).toBe('/api/users/999');
    });

    it('should accept array of messages', () => {
      const error: ApiErrorResponse = {
        statusCode: 400,
        message: ['email must be an email', 'name must be a string'],
        error: 'Bad Request',
        timestamp: '2024-01-01T00:00:00.000Z',
        path: '/api/users',
      };
      expect(Array.isArray(error.message)).toBe(true);
      expect((error.message as string[]).length).toBe(2);
    });
  });
});
