import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import {
  ValidateRecoveryUsecase,
  ValidateRecoveryUsecaseInput,
  ValidateRecoveryUsecaseOutput,
} from '@src/domain/usecases/auth/validate-recovery.usecase';

@Injectable()
export class ValidateRecoveryUsecaseImpl implements ValidateRecoveryUsecase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: ValidateRecoveryUsecaseInput,
  ): Promise<ValidateRecoveryUsecaseOutput> {
    const { email, code } = params;

    const recovery = await this.authRepository.findRecoveryBy({ email, code });

    if (!recovery) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Código não encontrado.',
      });
    }

    await this.authRepository.deleteRecovery(recovery.id);

    if (recovery.isExpired()) {
      throw this.exceptionService.businessException(
        {
          code_error: 'EXPIRED',
          message: 'Código expirado.',
        },
        400,
      );
    }

    return {
      userId: recovery.userId,
    };
  }
}
