import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { SessionRepository } from '@src/domain/repositories/session/session.repository';
import {
  GetSessionUsecase,
  GetSessionUsecaseInput,
  GetSessionUsecaseOutput,
} from '@src/domain/usecases/session/get-session.usecase';

@Injectable()
export class GetSessionUsecaseImpl implements GetSessionUsecase {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: GetSessionUsecaseInput,
  ): Promise<GetSessionUsecaseOutput> {
    const { userId, id } = params;

    const session = await this.sessionRepository.getById(id);

    if (!session) {
      this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Sessão não encontrada',
      });
    }

    if (session.userId !== userId) {
      this.exceptionService.forbiddenException({
        code_error: 'FORBIDDEN',
        message: 'Você não tem permissão para acessar essa sessão',
      });
    }

    return session;
  }
}
