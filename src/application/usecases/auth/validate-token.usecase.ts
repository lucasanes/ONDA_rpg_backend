import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { UserModel } from '@src/domain/model/user.model';
import {
  ValidateTokenUsecase,
  ValidateTokenUsecaseInput,
  ValidateTokenUsecaseOutput,
} from '@src/domain/usecases/auth/validate-token.usecase';

@Injectable()
export class ValidateTokenUsecaseImpl implements ValidateTokenUsecase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: ValidateTokenUsecaseInput,
  ): Promise<ValidateTokenUsecaseOutput> {
    const { token } = params;

    const tokenWithoutBearer = token.split(' ')[1];

    const tokenIsValid = this.jwtService.verify(tokenWithoutBearer);

    if (!tokenIsValid) {
      throw this.exceptionService.unauthorizedException({
        code_error: 'INVALID_TOKEN',
        message: 'Token inválido',
      });
    }

    const user = await this.jwtService.decode(tokenWithoutBearer);

    return new UserModel(user);
  }
}
