import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message:
        typeof exceptionResponse === 'object' && 'message' in exceptionResponse
          ? (exceptionResponse as Record<string, unknown>).message as string | string[]
          : exception.message,
      error:
        typeof exceptionResponse === 'object' && 'error' in exceptionResponse
          ? (exceptionResponse as Record<string, unknown>).error as string
          : HttpStatus[status],
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    this.logger.warn(
      `HTTP ${status} ${request.method} ${request.url}: ${JSON.stringify(errorResponse.message)}`,
    );

    response.status(status).json(errorResponse);
  }
}
