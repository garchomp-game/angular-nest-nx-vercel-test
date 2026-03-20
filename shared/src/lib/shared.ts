// Shared types and interfaces between frontend and backend

export interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  name?: string;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
}

export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}
