export class BaseResponse {
  exceptionFilter(status: string, statusCode: number, message: string) {
    return {
      status: status,
      statusCode: statusCode,
      message: message,
    };
  }

  static ok({ data, message = 'Success' }: { data?: any; message?: string }) {
    return {
      status: 'Success',
      statusCode: 200,
      message: message,
      data: data,
    };
  }

  static created({
    data,
    message = 'Created',
  }: {
    data?: any;
    message?: string;
  }) {
    return {
      status: 'Created',
      statusCode: 201,
      message: message,
      data: data,
    };
  }

  static accepted({
    data,
    message = 'Accepted',
  }: {
    data?: any;
    message?: string;
  }) {
    return {
      status: 'Accepted',
      statusCode: 202,
      message: message,
      data: data,
    };
  }

  static badRequest({
    data,
    message = 'Bad Request',
  }: {
    data?: any;
    message?: string;
  }) {
    return {
      status: 'Bad Request',
      statusCode: 400,
      message: message,
      data: data,
    };
  }

  static unauthorized(data: any, message = 'Unauthorized') {
    return {
      status: 'Unauthorized',
      statusCode: 401,
      message: message,
      data: data,
    };
  }

  static forbidden(data: any, message = 'Forbidden') {
    return {
      status: 'Forbidden',
      statusCode: 403,
      message: message,
      data: data,
    };
  }

  static notFound(data: any, message = 'Not Found') {
    return {
      status: 'Not Found',
      statusCode: 404,
      message: message,
      data: data,
    };
  }

  static internalServerError(data: any, message = 'Internal Server Error') {
    return {
      status: 'Internal Server Error',
      statusCode: 500,
      message: message,
      data: data,
    };
  }

  static notImplemented(data: any, message = 'Not Implemented') {
    return {
      status: 'Not Implemented',
      statusCode: 501,
      message: message,
      data: data,
    };
  }

  static serviceUnavailable(data: any, message = 'Service Unavailable') {
    return {
      status: 'Service Unavailable',
      statusCode: 503,
      message: message,
      data: data,
    };
  }
}
