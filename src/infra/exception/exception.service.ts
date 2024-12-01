import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpStatus } from '@src/domain/enum/http-status.enum';
import {
  ExceptionService,
  IFormatExceptionMessage,
} from '@src/domain/exceptions/exception.interface';

@Injectable()
export class ExceptionServiceImpl implements ExceptionService {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
  unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
  notFoundException(data?: IFormatExceptionMessage): void {
    throw new NotFoundException(data);
  }
  externalApiException(data: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
  businessException(
    data: IFormatExceptionMessage,
    httpStatus: HttpStatus,
  ): void {
    throw new HttpException(data, httpStatus);
  }
}
