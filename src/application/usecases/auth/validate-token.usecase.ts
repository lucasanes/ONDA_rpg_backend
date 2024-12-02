import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '@src/domain/model/user.model';
import {
  ValidateTokenUsecase,
  ValidateTokenUsecaseInput,
  ValidateTokenUsecaseOutput,
} from '@src/domain/usecases/auth/validate-token.usecase';

@Injectable()
export class ValidateTokenUsecaseImpl implements ValidateTokenUsecase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(
    params: ValidateTokenUsecaseInput,
  ): Promise<ValidateTokenUsecaseOutput> {
    const { token } = params;

    const tokenWithoutBearer = token.split(' ')[1];

    const user = await this.jwtService.decode(tokenWithoutBearer);

    return new UserModel(user);
  }
}
