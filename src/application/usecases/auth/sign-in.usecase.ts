import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import {
  SignInUsecase,
  SignInUsecaseInput,
  SignInUsecaseOutput,
} from '@src/domain/usecases/auth/sign-in.usecase';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignInUsecaseImpl implements SignInUsecase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(params: SignInUsecaseInput): Promise<SignInUsecaseOutput> {
    const user = await this.authRepository.findUserBy({
      email: params.email,
    });

    if (!user) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Usuário não encontrado.',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      params.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw this.exceptionService.unauthorizedException({
        code_error: 'INVALID_CREDENTIALS',
        message: 'Credenciais inválidas.',
      });
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return { user, token };
  }
}
