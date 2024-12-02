import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import {
  ChangePasswordUsecase,
  ChangePasswordUsecaseInput,
  ChangePasswordUsecaseOutput,
} from '@src/domain/usecases/auth/change-password.usecase';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChangePasswordUsecaseImpl implements ChangePasswordUsecase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: ChangePasswordUsecaseInput,
  ): Promise<ChangePasswordUsecaseOutput> {
    const { password, userId } = params;

    const user = await this.authRepository.getUserById(userId);

    if (!user) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Usuário não encontrado.',
      });
    }

    const passwordEncrypted = await bcrypt.hash(password, 10);

    await this.authRepository.changePassword({
      password: passwordEncrypted,
      userId,
    });
  }
}
