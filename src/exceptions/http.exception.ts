export class HttpException extends Error {
    constructor(
      public status: number,
      public message: string,
      public code: string = 'HTTP_ERROR',
      public details?: any
    ) {
      super(message);
      Object.setPrototypeOf(this, HttpException.prototype);
    }
  }
  
  export class NotFoundException extends HttpException {
    constructor(message = 'Resource not found') {
      super(404, message, 'RESOURCE_NOT_FOUND');
    }
  }
  
  export class UnauthorizedException extends HttpException {
    constructor(message = 'Unauthorized') {
      super(401, message, 'UNAUTHORIZED');
    }
  }
  
  export class ForbiddenException extends HttpException {
    constructor(message = 'Forbidden') {
      super(403, message, 'FORBIDDEN');
    }
  }
  
  export class BadRequestException extends HttpException {
    constructor(message = 'Bad Request', details?: any) {
      super(400, message, 'BAD_REQUEST', details);
    }
  }