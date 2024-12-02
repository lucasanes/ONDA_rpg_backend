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

    const usernameAlreadyExists = await this.authRepository.getUserBy({
      username,
    });

    const emailAlreadyExists = await this.authRepository.getUserBy({
      email,
    });

    if (usernameAlreadyExists || emailAlreadyExists) {
      this.exceptionService.badRequestException({
        code_error: 'ALREADY_EXISTS',
        message: 'Este email ou nome de usuário já existe.',
      });
    }

    const passwrodEncrypted = await bcrypt.hash(password, 10);

    const user = await this.authRepository.saveUser({
      username: username.toLocaleLowerCase(),
      email: email.toLocaleLowerCase(),
      password: passwrodEncrypted,
    });

    if (!user) {
      this.exceptionService.internalServerErrorException({
        code_error: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao criar usuário.',
      });
    }
  }
}
