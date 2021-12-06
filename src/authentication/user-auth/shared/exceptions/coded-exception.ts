import { HttpException, HttpStatus } from '@nestjs/common';
import { AccessType, ExceptionCode } from '../index';

export class CodedException extends HttpException {
  code: ExceptionCode;
  args: any;

  constructor(
    code: ExceptionCode,
    statusCode: HttpStatus,
    message: string,
    args?: any,
  ) {
    super(message, statusCode);
    this.code = code;
    this.args = args;
  }
}

export class ResourceNotFoundException extends CodedException {
  constructor(resourceType: string) {
    super(
      `${resourceType}_NOT_FOUND`,
      HttpStatus.NOT_FOUND,
      `Resource not found`,
    );
  }
}

export class ResourceNotAccessibleException extends CodedException {
  constructor(resourceType: string, accessType?: AccessType) {
    super(
      `${resourceType}_INACCESSIBLE`,
      HttpStatus.FORBIDDEN,
      `Resource Inaccessible` +
        (accessType == null ? '' : ` for access type <${accessType}>`),
    );
  }
}
