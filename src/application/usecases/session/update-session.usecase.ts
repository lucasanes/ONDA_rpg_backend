import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { SessionRepository } from '@src/domain/repositories/session/session.repository';
import {
  UpdateSessionUsecase,
  UpdateSessionUsecaseInput,
  UpdateSessionUsecaseOutput,
} from '@src/domain/usecases/session/update-session.usecase';

@Injectable()
export class UpdateSessionUsecaseImpl implements UpdateSessionUsecase {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: UpdateSessionUsecaseInput,
  ): Promise<UpdateSessionUsecaseOutput> {
    const session = await this.sessionRepository.getById(params.id);

    if (!session) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Sessão não encontrada.',
      });
    }

    await this.sessionRepository.update({
      ...params,
      id: params.id,
    });
  }
}
