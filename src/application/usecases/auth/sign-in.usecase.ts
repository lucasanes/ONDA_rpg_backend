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
    const user = await this.authRepository.getUserBy({
      email: params.email,
    });

    if (!user) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Email ou senha inválidos.',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      params.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw this.exceptionService.unauthorizedException({
        code_error: 'INVALID_CREDENTIALS',
        message: 'Email ou senha inválidos.',
      });
    }

    const token = this.jwtService.sign(
      {
        createdAt: user.createdAt,
        email: user.email,
        id: user.id,
        updatedAt: user.updatedAt,
        username: user.username,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return { token, user };
  }
}
