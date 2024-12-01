import { HttpStatus } from '../enum/http-status.enum';

export interface IFormatExceptionMessage {
  code_error: string;
  message: string;
}

export abstract class ExceptionService {
  abstract unauthorizedException(data?: IFormatExceptionMessage): void;
  abstract badRequestException(data: IFormatExceptionMessage): void;
  abstract forbiddenException(data?: IFormatExceptionMessage): void;
  abstract internalServerErrorException(data?: IFormatExceptionMessage): void;
  abstract businessException(
    data: IFormatExceptionMessage,
    httpStatus: HttpStatus,
  ): void;
  abstract notFoundException(data?: IFormatExceptionMessage): void;
  abstract externalApiException(data: IFormatExceptionMessage): void;
}
