import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import {
  UpdateUserUsecase,
  UpdateUserUsecaseInput,
  UpdateUserUsecaseOutput,
} from '@src/domain/usecases/user/update-user.usecase';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUsecaseImpl implements UpdateUserUsecase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: UpdateUserUsecaseInput,
  ): Promise<UpdateUserUsecaseOutput> {
    const { id, email, username, currentPassword } = params;

    console.log({ params });

    const user = await this.authRepository.getUserById(id);

    if (!user) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Usuário não encontrado.',
      });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      throw this.exceptionService.forbiddenException({
        code_error: 'FORBIDDEN',
        message: 'Senha atual incorreta.',
      });
    }

    const password = params.password
      ? await bcrypt.hash(params.password, 10)
      : undefined;

    await this.authRepository.updateUser({
      email,
      id,
      password,
      username,
    });
  }
}
