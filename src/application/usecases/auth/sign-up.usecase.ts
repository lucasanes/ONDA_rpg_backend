import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import {
  SignUpUsecase,
  SignUpUsecaseInput,
  SignUpUsecaseOutput,
} from '@src/domain/usecases/auth/sign-up.usecase';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpUsecaseImpl implements SignUpUsecase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(params: SignUpUsecaseInput): Promise<SignUpUsecaseOutput> {
    const { username, email, password } = params;

    const usernameAlreadyExists = await this.authRepository.findUserBy({
      username,
    });

    const emailAlreadyExists = await this.authRepository.findUserBy({
      email,
    });

    if (usernameAlreadyExists || emailAlreadyExists) {
      this.exceptionService.badRequestException({
        code_error: 'USER_ALREADY_EXISTS',
        message: 'User already exists',
      });
    }

    const passwrodEncrypted = await bcrypt.hash(password, 10);

    const user = await this.authRepository.save({
      username: username.toLocaleLowerCase(),
      email: email.toLocaleLowerCase(),
      password: passwrodEncrypted,
    });

    if (!user) {
      this.exceptionService.internalServerErrorException({
        code_error: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
      });
    }
  }
}
