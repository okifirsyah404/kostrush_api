import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';
import { BaseResponse } from './base-response';

/**
 * Class for describing implementation of an exception filter
 *
 * This class will catch all HttpException and send the response with the status code and message.
 */
@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();

    const baseResponse = new BaseResponse();

    if (exception.message.includes('ENOENT')) {
      return response
        .status(404)
        .send(
          baseResponse.exceptionFilter(exception.name, 404, 'File not found'),
        );
    }

    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      return response
        .status(500)
        .send(
          baseResponse.exceptionFilter(
            exception.name,
            500,
            'Internal server error',
          ),
        );
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      return response
        .status(500)
        .send(
          baseResponse.exceptionFilter(
            exception.name,
            500,
            'Internal server error',
          ),
        );
    });

    response
      .status(status)
      .send(
        baseResponse.exceptionFilter(exception.name, status, exception.message),
      );
  }
}
